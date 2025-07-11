// /src/utils/storage.ts
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export const saveHistory = (item: any) => {
  let history = getHistory();
  history = history.filter((x: any) => x.place_id !== item.place_id);
  history.unshift(item); 
  history = history.slice(0, 10);
  storage.set('history', JSON.stringify(history));
};

export const setCacheAPI = (key: string,item: any) => {
    let cache = item.slice(0, 10);
    storage.set('cache-'+ key, JSON.stringify(cache));
  };

export const getHistory = () => {
  const raw = storage.getString('history');
  return raw ? JSON.parse(raw) : [];
};

export const getCache = (key: string) => {
    const raw = storage.getString('cache-'+ key);
    return raw ? JSON.parse(raw) : [];
  };
  
export const clearHistory = () => {
  storage.delete('history');
};
