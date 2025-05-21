import { FastifyPluginAsync } from 'fastify';

import { AlertsService } from '../../../services/alerts.js';
import { CreateAlertPayload } from '../../../types/alerts.js';

const routes: FastifyPluginAsync = async (fastify): Promise<void> => {
  const { prisma } = fastify;
  const alertsService = new AlertsService({ prisma });

  fastify.post<{ Body: { payload: CreateAlertPayload } }>('/create', {}, async (req, res) => {
    try {
      console.log('[alerts/create] ↩️  request payload:', req.body.payload);

      /* 1 · create the alert in DB */
      const { payload } = req.body;
      const alert = await alertsService.createAlert(payload);
      console.log('[alerts/create] ✅ alert created → id:', alert.id);

      /* 2 · push “alert.new” message so the worker can send the first e-mail */
      const published = fastify.rabbit.channel.sendToQueue('alert.new', Buffer.from(alert.id));
      console.log('[alerts/create] 📨 message published?', published);

      /* 3 · respond to client */
      res.code(201).send(alert);
    } catch (err) {
      console.error('[alerts/create] 💥 error:', err);
      res.code(500).send({ error: 'failed to create alert' });
    }
  });
};

export default routes;
