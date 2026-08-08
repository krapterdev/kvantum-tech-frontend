import * as settingService from './setting.service.js';

export const getSettings = async (req, res, next) => {
  try {
    const settings = await settingService.fetchSettings();
    return res.status(200).json(settings);
  } catch (err) {
    next(err);
  }
};

export const updateSetting = async (req, res, next) => {
  try {
    const { key } = req.params;
    const { value } = req.body;
    
    if (value === undefined) {
      return res.status(400).json({ error: 'Value payload parameters are required.' });
    }

    const updated = await settingService.saveSetting(key, value);
    return res.status(200).json({ key, value: updated });
  } catch (err) {
    next(err);
  }
};

export const getSeoSettings = async (req, res, next) => {
  try {
    const list = await settingService.fetchSeoSettings();
    return res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const updateSeoSetting = async (req, res, next) => {
  try {
    const { key } = req.params;
    const updated = await settingService.saveSeoSetting(key, req.body);
    return res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};
