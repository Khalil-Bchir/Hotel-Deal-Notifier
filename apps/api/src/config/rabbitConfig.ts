// Central place for everything Rabbit-MQ so you don’t hard-code strings

export const rabbitConfig = {
  /** Connection URI — e.g. amqp://user:pass@host:5672/vhost */
  url: process.env.RABBIT_URL ?? 'amqp://rabbitmq',

  /** Prefetch for consumers created in the Fastify layer */
  prefetch: Number(process.env.RABBIT_PREFETCH ?? 10),

  /** Queue names used by the app (add more as you grow) */
  queues: {
    EMAIL_OUT: 'email.out', // ⬅ all e-mail tasks land here
    TOP_DEALS: 'top.deals', // ⬅ reserve for future fan-out
  } as const,
};

export type QueueName = (typeof rabbitConfig.queues)[keyof typeof rabbitConfig.queues];
