import { asyncHandler } from '../../utils/asyncHandler.js';
import * as assetService from './asset.service.js';
import { ApiError } from '../../utils/ApiError.js';

export const handleGetAssets = asyncHandler(async (req, res) => {
  const assets = await assetService.fetchAssets();
  // Return plain array directly to support list states in setAssets(data)
  res.status(200).json(assets);
});

export const handleUploadAsset = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'No file buffer submitted');
  }

  const result = await assetService.saveAsset(req.file);
  // Return uploaded object directly to support UI rendering after uploads
  res.status(200).json(result);
});

export const handleDeleteAsset = asyncHandler(async (req, res) => {
  const { name } = req.params;
  const result = await assetService.removeAsset(name);
  
  // Return success state directly to support UI list filters
  res.status(200).json(result);
});
