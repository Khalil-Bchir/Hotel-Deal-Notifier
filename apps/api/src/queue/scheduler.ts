import { prisma } from '@saas-monorepo/database';
import cron from 'node-cron';

import { alertQueue } from './bullmq.js';

cron.schedule('25 * * * *', async () => {
  const alerts = await prisma.alert.findMany({
    where: {
      isActive: true,
      OR: [{ lastSentAt: null }, { lastSentAt: { lt: new Date(Date.now() - 24 * 3600e3) } }],
    },
  });
  for (const a of alerts) {
    await alertQueue.add('fetchTopDeals', { alertId: a.id }, { jobId: a.id });
  }
});
