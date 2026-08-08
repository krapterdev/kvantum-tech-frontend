import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL,
  jwt: {
    secret: process.env.JWT_SECRET || 'f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8',
    expiry: process.env.JWT_EXPIRY || '7d'
  },
  clientUrl: process.env.CLIENT_URL || 'https://kvantumtechsolutions.com',
  // clientUrl: 'http://localhost:5173',
  s3: {
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION || 'ap-southeast-1',
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    bucketName: process.env.S3_BUCKET_NAME || 'kvantumtechsolutions_storage',
  },
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    receiverEmail: process.env.RECEIVER_EMAIL,
  }
};
