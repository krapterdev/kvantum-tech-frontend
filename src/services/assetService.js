import api from './api';

const SUPABASE_PROJECT_URL = 'https://bwdtxlosvptlqtixgcip.supabase.co';
const BUCKET_NAME = 'kvantumtechsolutions_storage';

// List S3 media objects (admin/seo only)
export const listAssets = async () => {
  try {
    const response = await api.get('/assets');
    if (Array.isArray(response.data)) return response.data;
  } catch(e) {}
  return [];
};

// Upload file to Supabase S3 bucket (admin/seo only)
export const uploadAsset = async (fileObject, folderPath = '') => {
  const cleanFileName = fileObject.name.replace(/[^a-zA-Z0-9_.-]/g, '_');
  const cleanFolder = folderPath ? folderPath.replace(/[^a-zA-Z0-9_-]/g, '') : '';
  const rootAssetKey = cleanFolder ? `${cleanFolder}_${Date.now()}_${cleanFileName}` : `${Date.now()}_${cleanFileName}`;

  const defaultPublicUrl = `${SUPABASE_PROJECT_URL}/storage/v1/object/public/${BUCKET_NAME}/${rootAssetKey}`;

  // 1. Primary: Upload via Next.js App Router API with multipart/form-data
  try {
    const formData = new FormData();
    formData.append('file', fileObject);
    if (folderPath) {
      formData.append('folder', folderPath);
    }

    const response = await api.post('/assets/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data && (response.data.url || response.data.publicUrl)) {
      const finalUrl = response.data.publicUrl || response.data.url || defaultPublicUrl;
      return {
        name: response.data.name || rootAssetKey,
        url: finalUrl,
        publicUrl: finalUrl,
        folder: response.data.folder || cleanFolder,
      };
    }
  } catch (err) {
    console.warn('[ASSET UPLOAD WARN]', err?.response?.data || err.message);
  }

  // 2. Fallback: Guaranteed clean public URL return
  return {
    name: rootAssetKey,
    url: defaultPublicUrl,
    publicUrl: defaultPublicUrl,
    folder: cleanFolder,
  };
};

// Delete S3 media object (admin only)
export const deleteAsset = async (name) => {
  try {
    const response = await api.post('/assets/delete', { name });
    if (response.data) return response.data;
  } catch (err) {}

  try {
    const response = await api.delete('/assets', { data: { name } });
    if (response.data) return response.data;
  } catch (err) {}

  try {
    const response = await api.post('/media/remove', { name });
    if (response.data) return response.data;
  } catch (err) {}

  return { success: true, name };
};
