import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const S3_ENDPOINT = process.env.S3_ENDPOINT || 'https://bwdtxlosvptlqtixgcip.storage.supabase.co/storage/v1/s3';
const S3_REGION = process.env.S3_REGION || 'ap-southeast-1';
const S3_KEY = process.env.S3_ACCESS_KEY_ID || '33115ce861a8bddb04e8fbc63cf35e91';
const S3_SECRET_KEY = process.env.S3_SECRET_ACCESS_KEY || '10aa4d1c43aa90f06111cf0e12fb0e3bc39a516a314792f0ab74ed655f8660a2';
const S3_BUCKET = process.env.S3_BUCKET_NAME || 'kvantumtechsolutions_storage';
const SUPABASE_PUBLIC_URL = 'https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public';

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
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const rawName = file.name || 'image.png';
    const cleanName = rawName.replace(/[^a-zA-Z0-9_.-]/g, '_');
    // Save at root object key for guaranteed public 200 OK access
    const key = `${Date.now()}_${cleanName}`;
    const publicUrl = `${SUPABASE_PUBLIC_URL}/${S3_BUCKET}/${key}`;

    let contentType = file.type || 'image/png';
    if (!contentType || contentType === 'application/octet-stream') {
      const ext = cleanName.split('.').pop()?.toLowerCase();
      if (ext === 'png') contentType = 'image/png';
      else if (ext === 'jpg' || ext === 'jpeg') contentType = 'image/jpeg';
      else if (ext === 'svg') contentType = 'image/svg+xml';
      else if (ext === 'webp') contentType = 'image/webp';
      else contentType = 'image/png';
    }

    await s3.send(new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    }));

    return NextResponse.json({
      success: true,
      name: key,
      url: publicUrl,
      publicUrl: publicUrl,
      size: file.size,
      contentType: contentType,
    });
  } catch (err: any) {
    console.error('[NEXT API ASSET UPLOAD ERROR]', err);
    return NextResponse.json({ error: err?.message || 'Upload failed' }, { status: 500 });
  }
}
