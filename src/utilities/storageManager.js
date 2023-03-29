class StorageManager {
    static get(key, storagePlace = sessionStorage) {
      return storagePlace.getItem(key);
    }
  
    static set(key, value, storagePlace = sessionStorage) {
      storagePlace.setItem(key, value);
    }
  
    static getObject(key, storagePlace = sessionStorage) {
      let obj = storagePlace.getItem(key);
      if (obj) {
        obj = JSON.parse(obj);
        return obj;
      }
      return null;
    }
  
    static setObject(key, value, storagePlace = sessionStorage) {
      const obj = JSON.stringify(value);
      storagePlace.setItem(key, obj);
    }
  
    static removeItem(key, storagePlace = sessionStorage) {
      storagePlace.removeItem(key);
    }
  
    static clearStorage(storagePlace=sessionStorage) {
      storagePlace.clear();
    }
  }
  
  export default StorageManager;
  