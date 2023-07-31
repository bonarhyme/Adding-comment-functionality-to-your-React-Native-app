import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_NAMES } from './variables.storage';

export const storeDataInStorage = async (
  key: keyof typeof STORAGE_NAMES,
  value: any
): Promise<{ error: boolean; success: boolean }> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return { success: true, error: false };
  } catch (e) {
    return {
      error: true,
      success: false,
    };
  }
};

export const getDataInStorage = async (
  key: keyof typeof STORAGE_NAMES
): Promise<{ error: boolean; success: boolean; data: any }> => {
  try {
    const _data = await AsyncStorage.getItem(key);

    const data = _data ? JSON.parse(_data) : null;

    return { success: true, error: false, data: data };
  } catch (e) {
    return {
      error: true,
      success: false,
      data: null,
    };
  }
};

export const removeDataInStorage = async (
  key: keyof typeof STORAGE_NAMES
): Promise<{ error: boolean; success: boolean; data: any }> => {
  try {
    const _data = await AsyncStorage.removeItem(key);

    return { success: true, error: false, data: null };
  } catch (e) {
    return {
      error: true,
      success: false,
      data: null,
    };
  }
};

export const clearStorage = async () => {
  // try {
  const clear = await AsyncStorage.clear();
  return clear;
  // } catch (error) {
  //   return {
  //     error: true,
  //     success: false,
  //   };
  // }
};
