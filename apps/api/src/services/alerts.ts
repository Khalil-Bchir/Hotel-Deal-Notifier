import { PrismaClient } from '@saas-monorepo/database';

import { CreateAlertPayload } from '../types/alerts.js';
import { AbstractServiceOptions } from '../types/services.js';

export class AlertsService {
  prisma: PrismaClient;
  constructor(options: AbstractServiceOptions) {
    this.prisma = options.prisma;
  }

  async createAlert(payload: CreateAlertPayload) {
    try {
      return await this.prisma.alert.create({
        data: {
          userId: payload.userId,
          destination: payload.destination,
          checkinDate: payload.checkinDate,
          checkoutDate: payload.checkoutDate,
        },
      });
    } catch (err: any) {
      throw err;
    }
  }
}
