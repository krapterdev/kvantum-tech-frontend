// Shared DB/S3/JWT helpers for all Vercel API functions
const pg = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { S3Client } = require('@aws-sdk/client-s3');

const DB_URL = process.env.DATABASE_URL || 'postgresql://postgres.bwdtxlosvptlqtixgcip:kEM3onWoT9AT82mr@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres';
const JWT_SECRET = process.env.JWT_SECRET || 'f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8';

const { Pool } = pg;

function getPool() {
  return new Pool({ connectionString: DB_URL, ssl: { rejectUnauthorized: false } });
}

function getS3() {
  return new S3Client({
    endpoint: process.env.S3_ENDPOINT || 'https://bwdtxlosvptlqtixgcip.storage.supabase.co/storage/v1/s3',
    region: process.env.S3_REGION || 'ap-southeast-1',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '33115ce861a8bddb04e8fbc63cf35e91',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '10aa4d1c43aa90f06111cf0e12fb0e3bc39a516a314792f0ab74ed655f8660a2'
    },
    forcePathStyle: true
  });
}

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
}

function verifyAuth(req) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) throw new Error('Unauthorized');
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { getPool, getS3, getCors: setCors, verifyAuth, bcrypt, jwt, JWT_SECRET, DB_URL };
