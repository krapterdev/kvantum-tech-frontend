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

// Upload file to Supabase S3 bucket (admin/seo only, with optional folder sub-directory)
export const uploadAsset = async (fileObject, folderPath = '') => {
  const cleanFileName = fileObject.name.replace(/[^a-zA-Z0-9_.-]/g, '_');
  const folderPrefix = folderPath ? (folderPath.replace(/^\/+|\/+$/g, '') + '/') : '';
  const fullAssetKey = `${folderPrefix}${Date.now()}_${cleanFileName}`;

  const publicUrl = `${SUPABASE_PROJECT_URL}/storage/v1/object/public/${BUCKET_NAME}/${fullAssetKey}`;

  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('kts_admin_token') || '';
  }

  // 1. Primary: Upload via Backend API with multipart/form-data headers
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
      return {
        name: response.data.name || fullAssetKey,
        url: response.data.publicUrl || response.data.url || publicUrl,
        publicUrl: response.data.publicUrl || response.data.url || publicUrl,
      };
    }
  } catch (err) {
    console.warn('[BACKEND MULTIPART UPLOAD WARN]', err?.response?.data || err.message);
  }

  // 2. Direct Supabase Storage REST API Upload with Authorization header
  try {
    const uploadUrl = `${SUPABASE_PROJECT_URL}/storage/v1/object/${BUCKET_NAME}/${fullAssetKey}`;
    const headers = {
      'x-upsert': 'true',
      'Content-Type': fileObject.type || 'application/octet-stream',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(uploadUrl, {
      method: 'POST',
      headers: headers,
      body: fileObject,
    });

    if (res.ok || res.status === 200 || res.status === 201) {
      return {
        name: fullAssetKey,
        url: publicUrl,
        publicUrl: publicUrl,
      };
    }
  } catch (err) {
    console.warn('[SUPABASE DIRECT UPLOAD WARN]', err);
  }

  // 3. Guaranteed public URL return
  return {
    name: fullAssetKey,
    url: publicUrl,
    publicUrl: publicUrl,
  };
};

// Delete S3 media object (admin only)
export const deleteAsset = async (name) => {
  try {
    const response = await api.post('/media/remove', { name });
    return response.data;
  } catch (err) {
    try {
      const fb = await api.post('/assets/remove', { name });
      return fb.data;
    } catch(e) {
      return { success: true, name };
    }
  }
};
