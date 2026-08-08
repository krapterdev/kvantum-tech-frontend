import * as assetRepository from './asset.repository.js';
import { BUCKET_NAME } from '../../config/s3.js';

export const fetchAssets = async () => {
  const data = await assetRepository.listAssets();
  return (data.Contents || []).map(item => {
    const fileUrl = `https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/${BUCKET_NAME}/${item.Key}`;
    
    // Infer contentType from file extension for rendering thumbnails in frontend
    const ext = item.Key.split('.').pop().toLowerCase();
    const imageExtensions = ['png', 'jpg', 'jpeg', 'svg', 'gif', 'webp'];
    const contentType = imageExtensions.includes(ext) 
      ? `image/${ext === 'svg' ? 'svg+xml' : ext === 'jpg' ? 'jpeg' : ext}` 
      : 'application/octet-stream';

    return {
      name: item.Key,
      created_at: item.LastModified,
      publicUrl: fileUrl,
      url: fileUrl, // alias for frontend
      size: item.Size || 0,
      contentType
    };
  });
};

export const saveAsset = async (file) => {
  const timestamp = Date.now();
  const safeName = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_');
  const fileName = `${timestamp}_${safeName}`;

  await assetRepository.uploadAsset(fileName, file.buffer, file.mimetype);
  
  const publicUrl = `https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/${BUCKET_NAME}/${fileName}`;
  return {
    success: true,
    name: fileName,
    publicUrl,
    url: publicUrl // alias for frontend
  };
};

export const removeAsset = async (fileName) => {
  await assetRepository.deleteAsset(fileName);
  return { success: true };
};
