export enum StorageItem {
  Token = 'token',
  Profile = 'profile',
  User = 'user',
  Master = 'master',
  Dataset = 'Dataset',
}

export const getItem = (itemName: StorageItem): unknown | null => {
  const item = localStorage.getItem(itemName);
  return item ? item : null;
};

export const setItem = (itemName: StorageItem, value: string): void => {
  localStorage.setItem(itemName, value);
};

export const removeItem = (itemName: StorageItem): void => {
  localStorage.removeItem(itemName);
};
