import { FastifyPluginAsync } from 'fastify';

import { HotelsService } from '../../../services/hotels.js';
import { HotelSearchParams } from '../../../types/hotels.js';

const routes: FastifyPluginAsync = async (fastify): Promise<void> => {
  const { prisma } = fastify;
  const hotelsService = new HotelsService({ prisma });

  fastify.get<{ Querystring: HotelSearchParams }>('/fetch', async (request, reply) => {
    try {
      const results = await hotelsService.searchDiscounted(request.query);
      return reply.send(results);
    } catch (err: any) {
      if (err?.status && err?.body) {
        return reply.status(err.status).send(err.body);
      }

      fastify.log.error(err);
      return reply.status(500).send({ message: 'Internal server error', error: err?.message });
    }
  });
};

export default routes;
