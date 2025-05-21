import { Queue } from 'bullmq';

import { redisConfig } from '../config/redisConfig.js';

export const alertQueue = new Queue('alert-fetch', { connection: redisConfig });
export const emailQueue = new Queue('email-send', { connection: redisConfig });
