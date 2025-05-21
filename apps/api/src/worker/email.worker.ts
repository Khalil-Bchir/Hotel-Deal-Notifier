import amqplib from 'amqplib';
import fs from 'fs/promises';
import hbs from 'handlebars';
import nodemailer from 'nodemailer';

const mq = await amqplib.connect(process.env.RABBIT_URL || 'amqp://rabbitmq');
const ch = await mq.createChannel();
await ch.assertQueue('email.out', { durable: true });

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

ch.consume('email.out', async (msg) => {
  if (!msg) return;
  const payload = JSON.parse(msg.content.toString());

  // naive template loader
  const tpl = hbs.compile(await fs.readFile(`./templates/${payload.template}.hbs`, 'utf8'));
  await transporter.sendMail({
    to: payload.to,
    subject: payload.subject,
    html: tpl(payload.context),
  });

  ch.ack(msg);
});
