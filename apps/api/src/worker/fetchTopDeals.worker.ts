import { PrismaClient } from '@saas-monorepo/database';
import { connect } from 'amqplib';
import { Worker } from 'bullmq';
import { format } from 'date-fns';

import { rabbitConfig } from '../config/rabbitConfig.js';
import { HotelsService } from '../services/hotels.js';
import type { HotelSearchParams } from '../types/hotels.js';

const prisma = new PrismaClient();
const hotelsSvc = new HotelsService({ prisma });

/* ───────────────────────── RABBIT HELPER ───────────────────────── */

async function bootstrapRabbit() {
  const connection = await connect(rabbitConfig.url);
  const channel = await connection.createChannel();
  await channel.assertQueue(rabbitConfig.queues.EMAIL_OUT, { durable: true });

  const publishEmail = (payload: unknown) =>
    channel.sendToQueue(rabbitConfig.queues.EMAIL_OUT, Buffer.from(JSON.stringify(payload)), {
      persistent: true,
    });

  return { connection, channel, publishEmail };
}

/* ──────────────────────── MAIN WORKER LOOP ─────────────────────── */

(async () => {
  const { connection, channel, publishEmail } = await bootstrapRabbit();

  new Worker(
    'alert-fetch',
    async (job) => {
      const { alertId } = job.data as { alertId: string };

      /* 1 · Fetch alert + user e-mail */
      const alert = await prisma.alert.findUniqueOrThrow({
        where: { id: alertId },
        include: { User: { select: { email: true } } },
      });

      /* 2 · Format dates */
      const checkin = format(alert.checkinDate, 'yyyy-MM-dd');
      const checkout = format(alert.checkoutDate, 'yyyy-MM-dd');

      /* 3 · Build exactly the HotelSearchParams shape */
      const params: HotelSearchParams = {
        dest_id: alert.destination,
        checkin_date: checkin,
        checkout_date: checkout,
        page_number: '0',
        page_size: '10',
      };

      /* 4 · Query deals */
      const { results } = await hotelsSvc.searchDiscounted(params);

      /* 5 · Only publish if there are any results */
      if (results.length > 0) {
        publishEmail({
          to: alert.User.email,
          subject: `🔔 New hotel deals for ${alert.destination}`,
          template: 'deals',
          context: { deals: results, alert },
        });
      }

      return { matches: results.length };
    },
    {
      /* Redis connection for BullMQ */
      connection: {
        host: process.env.REDIS_HOST ?? '127.0.0.1',
        port: Number(process.env.REDIS_PORT ?? 6379),
      },
    },
  );

  /* ────────────── Graceful shutdown ─────────── */
  const shutdown = async () => {
    await channel.close();
    await connection.close();
    await prisma.$disconnect();
    process.exit(0);
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
})();
