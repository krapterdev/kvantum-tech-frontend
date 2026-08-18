import { NextResponse } from 'next/server';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

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

export async function GET() {
  try {
    const data = await s3.send(new ListObjectsV2Command({ Bucket: S3_BUCKET }));
    const items = (data.Contents || []).map((item) => {
      const key = item.Key || '';
      const publicUrl = `${SUPABASE_PUBLIC_URL}/${S3_BUCKET}/${key}`;
      const ext = key.split('.').pop()?.toLowerCase() || '';
      const imageExtensions = ['png', 'jpg', 'jpeg', 'svg', 'gif', 'webp'];
      const contentType = imageExtensions.includes(ext)
        ? `image/${ext === 'svg' ? 'svg+xml' : ext === 'jpg' ? 'jpeg' : ext}`
        : 'application/octet-stream';

      return {
        name: key,
        created_at: item.LastModified ? new Date(item.LastModified).toISOString() : new Date().toISOString(),
        publicUrl: publicUrl,
        url: publicUrl,
        size: item.Size || 0,
        contentType: contentType,
      };
    });

    return NextResponse.json(items);
  } catch (err: any) {
    console.error('[NEXT API LIST ASSETS ERROR]', err);
    return NextResponse.json([]);
  }
}
