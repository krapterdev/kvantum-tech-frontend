import nodemailer from 'nodemailer';
import { config } from '../config/env.js';
import { logger } from './logger.js';

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.port === 465,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  if (!config.smtp.user || !config.smtp.pass || !to) {
    logger.warn('[EMAIL] SMTP credentials or recipient email address are not configured. Email alert skipped.');
    return;
  }

  const mailOptions = {
    from: `"KTS Lead Protocol" <${config.smtp.user}>`,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logger.info(`[EMAIL SENT] Lead alert message transmitted successfully. ID: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error('[EMAIL ERROR] Failed to send lead email alert:', error);
    throw error;
  }
};
