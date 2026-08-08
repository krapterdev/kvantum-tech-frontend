import * as assetRepository from './asset.repository.js';
import { BUCKET_NAME } from '../../config/s3.js';

let localAssetStore = [];

export const fetchAssets = async () => {
  try {
    const data = await assetRepository.listAssets();
    const remoteAssets = (data.Contents || []).map(item => {
      const fileUrl = `https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/${BUCKET_NAME}/${item.Key}`;
      const ext = item.Key.split('.').pop().toLowerCase();
      const imageExtensions = ['png', 'jpg', 'jpeg', 'svg', 'gif', 'webp'];
      const contentType = imageExtensions.includes(ext) 
        ? `image/${ext === 'svg' ? 'svg+xml' : ext === 'jpg' ? 'jpeg' : ext}` 
        : 'application/octet-stream';

      return {
        name: item.Key,
        created_at: item.LastModified,
        publicUrl: fileUrl,
        url: fileUrl,
        size: item.Size || 0,
        contentType
      };
    });

    return [...localAssetStore, ...remoteAssets];
  } catch (err) {
    console.warn('[OFFLINE ASSET LIST]', err.message);
    return localAssetStore;
  }
};

export const saveAsset = async (file) => {
  const timestamp = Date.now();
  const safeName = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_');
  const fileName = `${timestamp}_${safeName}`;
  const ext = safeName.split('.').pop().toLowerCase();
  const mimeType = file.mimetype || `image/${ext}`;
  const base64Url = `data:${mimeType};base64,${file.buffer.toString('base64')}`;

  const newAsset = {
    name: fileName,
    created_at: new Date().toISOString(),
    publicUrl: base64Url,
    url: base64Url,
    size: file.size || (file.buffer ? file.buffer.length : 0),
    contentType: mimeType
  };

  try {
    if (file.buffer) {
      await assetRepository.uploadAsset(fileName, file.buffer, mimeType);
      const fileUrl = `https://bwdtxlosvptlqtixgcip.supabase.co/storage/v1/object/public/${BUCKET_NAME}/${fileName}`;
      newAsset.publicUrl = fileUrl;
      newAsset.url = fileUrl;
    }
  } catch (err) {
    console.warn('[OFFLINE ASSET UPLOAD FALLBACK] Saved asset in memory:', err.message);
  }

  localAssetStore.unshift(newAsset);
  return newAsset;
};

export const removeAsset = async (name) => {
  try {
    await assetRepository.deleteAsset(name);
  } catch (err) {
    console.warn('[OFFLINE ASSET DELETE]', err.message);
  }
  localAssetStore = localAssetStore.filter(a => a.name !== name);
  return { success: true, name };
};
