import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import { alertQueue } from '../queue/bullmq.js';

export declare type FastifyBullOptions = {};

async function fastifyBull(fastify: FastifyInstance, options: FastifyBullOptions) {
  fastify.decorate('bull', { alertQueue });
  fastify.addHook('onClose', async () => {
    await alertQueue.close();
  });
}

export default fp(fastifyBull, {
  name: 'bull',
});
