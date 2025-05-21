import type { Options } from 'amqplib';
import { connect } from 'amqplib';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import { rabbitConfig } from '../config/rabbitConfig.js';

/**
 * Fastify plugin - registers automatically thanks to @fastify/autoload
 */
export declare type FastifyRabbitOptions = {};

async function fastifyRabbit(fastify: FastifyInstance, options: FastifyRabbitOptions) {
  const { url, prefetch, queues } = rabbitConfig;

  // Single connection + channel for the whole HTTP process
  const connection = await connect(url);
  const channel = await connection.createChannel();
  if (prefetch) channel.prefetch(prefetch);

  // Make sure queues exist before we start serving traffic
  for (const q of Object.values(queues)) {
    await channel.assertQueue(q, { durable: true });
  }

  const publish = (
    queue: string,
    payload: unknown,
    options: Options.Publish = { persistent: true },
  ) => channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)), options);

  fastify.decorate<any>('rabbit', { connection, channel, publish });

  // Graceful shutdown
  fastify.addHook('onClose', async () => {
    await channel.close();
    await connection.close();
  });
}

export default fp(fastifyRabbit, {
  name: 'rabbit',
});
