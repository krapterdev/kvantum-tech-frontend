import { NextRequest, NextResponse } from 'next/server';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

const S3_ENDPOINT = process.env.S3_ENDPOINT || 'https://bwdtxlosvptlqtixgcip.storage.supabase.co/storage/v1/s3';
const S3_REGION = process.env.S3_REGION || 'ap-southeast-1';
const S3_KEY = process.env.S3_ACCESS_KEY_ID || '33115ce861a8bddb04e8fbc63cf35e91';
const S3_SECRET_KEY = process.env.S3_SECRET_ACCESS_KEY || '10aa4d1c43aa90f06111cf0e12fb0e3bc39a516a314792f0ab74ed655f8660a2';
const S3_BUCKET = process.env.S3_BUCKET_NAME || 'kvantumtechsolutions_storage';

const s3 = new S3Client({
  endpoint: S3_ENDPOINT,
  region: S3_REGION,
  credentials: {
    accessKeyId: S3_KEY,
    secretAccessKey: S3_SECRET_KEY,
  },
  forcePathStyle: true,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const targetName = body?.name || body?.url || body?.key || '';

    if (!targetName) {
      return NextResponse.json({ error: 'No asset name provided' }, { status: 400 });
    }

    let key = targetName;
    if (key.includes('/kvantumtechsolutions_storage/')) {
      key = key.split('/kvantumtechsolutions_storage/').pop();
    } else if (key.includes('/') && key.startsWith('http')) {
      key = key.split('/').pop();
    }

    await s3.send(new DeleteObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
    }));

    return NextResponse.json({ success: true, message: `Deleted ${key}` });
  } catch (err: any) {
    console.error('[NEXT API DELETE ASSET POST ERROR]', err);
    return NextResponse.json({ error: err?.message || 'Delete failed' }, { status: 500 });
  }
}
