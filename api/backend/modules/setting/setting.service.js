import * as settingRepository from './setting.repository.js';

export const fetchSettings = async () => {
  return await settingRepository.getSettings();
};

export const saveSetting = async (key, value) => {
  return await settingRepository.updateSettingByKey(key, value);
};

export const fetchSeoSettings = async () => {
  return await settingRepository.getSeoSettings();
};

export const saveSeoSetting = async (key, data) => {
  return await settingRepository.updateSeoSettingByKey(key, data);
};
