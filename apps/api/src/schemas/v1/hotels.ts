// src/schemas/v1/hotels.ts

export const hotelSchema = {
  getHotels: {
    tags: ['hotels'],
    querystring: {
      type: 'object',
      required: ['dest_id', 'checkin_date', 'checkout_date'],
      properties: {
        dest_id: {
          type: 'string',
          description: 'City or attraction ID to search hotels in',
        },
        dest_type: {
          type: 'string',
          enum: ['city', 'attraction'],
          default: 'city',
          description: 'Whether dest_id is a city or an attraction',
        },
        checkin_date: {
          type: 'string',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
          description: 'Check-in date (YYYY-MM-DD)',
        },
        checkout_date: {
          type: 'string',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
          description: 'Check-out date (YYYY-MM-DD)',
        },
        adults_number: {
          type: 'string',
          default: '2',
          description: 'Number of adults',
        },
        children_number: {
          type: 'string',
          default: '0',
          description: 'Number of children',
        },
        room_number: {
          type: 'string',
          default: '1',
          description: 'Number of rooms',
        },
        currency: {
          type: 'string',
          default: 'USD',
          description: 'Currency code for prices',
        },
        locale: {
          type: 'string',
          default: 'en-gb',
          description: 'Locale for returned strings',
        },
        order_by: {
          type: 'string',
          default: 'price',
          description: 'Sort order (e.g. price, popularity)',
        },
        units: {
          type: 'string',
          default: 'metric',
          description: 'Units for distance (metric or imperial)',
        },
      },
    },
    response: {
      200: {
        description: 'Successful hotel search response',
        type: 'object',
        properties: {
          // you can flesh this out if you want to validate individual fields
          result: { type: 'array', items: { type: 'object' } },
        },
      },
      '4xx': {
        type: 'object',
        properties: {
          status: { type: 'number' },
          code: { type: 'string' },
          message: { type: 'string' },
        },
      },
      500: {
        description: 'Internal server error',
        type: 'object',
        properties: {
          status: { type: 'number', default: 500 },
          code: { type: 'string' },
          message: { type: 'string' },
        },
      },
    },
  },
};
