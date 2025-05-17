// src/routes/v1/hotels/fetch.ts
import { FastifyPluginAsync } from 'fastify';
import fetch from 'node-fetch';

import { config } from '../../../config.js';

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const { rapidApiKey } = config;

  fastify.get<{
    Querystring: {
      dest_id: string;
      dest_type?: 'city' | 'attraction';
      checkin_date: string; // YYYY-MM-DD
      checkout_date: string; // YYYY-MM-DD
      adults_number?: string; // defaults to '2'
      children_number?: string; // defaults to '0'
      children_ages?: string; // e.g. '5,7' if two children
      room_number?: string; // defaults to '1'
      filter_by_currency?: string; // defaults to 'USD'
      locale?: string; // defaults to 'en-gb'
      order_by?: string; // defaults to 'price'
      units?: string; // defaults to 'metric'
      page_number?: string; // defaults to '0'
      include_adjacency?: string; // defaults to 'true'
    };
  }>('/fetch', async (request, reply) => {
    try {
      const {
        dest_id,
        dest_type = 'city',
        checkin_date,
        checkout_date,
        adults_number = '2',
        children_number = '0',
        children_ages = '',
        room_number = '1',
        filter_by_currency = 'USD',
        locale = 'en-gb',
        order_by = 'price',
        units = 'metric',
        page_number = '0',
        include_adjacency = 'true',
      } = request.query;

      const url = new URL('https://booking-com.p.rapidapi.com/v2/hotels/search');
      // Required params
      url.searchParams.set('dest_id', dest_id);
      url.searchParams.set('dest_type', dest_type);
      url.searchParams.set('checkin_date', checkin_date);
      url.searchParams.set('checkout_date', checkout_date);
      url.searchParams.set('adults_number', adults_number);
      url.searchParams.set('room_number', room_number);
      url.searchParams.set('page_number', page_number);
      url.searchParams.set('filter_by_currency', filter_by_currency);
      url.searchParams.set('locale', locale);
      url.searchParams.set('units', units);
      url.searchParams.set('order_by', order_by);
      url.searchParams.set('include_adjacency', include_adjacency);

      // Only include children_ages if children_number > 0
      if (parseInt(children_number, 10) > 0 && children_ages) {
        url.searchParams.set('children_number', children_number);
        url.searchParams.set('children_ages', children_ages);
      }

      const res = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'booking-com.p.rapidapi.com',
          'x-rapidapi-key': rapidApiKey,
        },
      });

      if (!res.ok) {
        const errorBody = await res.json();
        return reply.status(res.status).send(errorBody);
      }

      const data = await res.json();
      return reply.send(data);
    } catch (err: any) {
      fastify.log.error(err);
      console.error(err);
      reply.status(500).send({ message: 'Internal server error', error: err.message });
    }
  });
};

export default routes;
