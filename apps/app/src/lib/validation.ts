import { z } from 'zod';

export const formSchema = z.object({
  city: z.string().min(2, {
    message: 'City must be at least 2 characters.',
  }),
  dates: z.object({
    from: z.date(),
    to: z.date(),
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

export const searchSchema = z.object({
  destination: z.string().min(2, {
    message: 'Destination must be at least 2 characters.',
  }),
});
