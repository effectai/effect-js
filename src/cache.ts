import { get as idbGet, set as idbSet } from "idb-keyval";
export const memoryCache = new Map();

export interface Cache {
  get(key: string): unknown;
  set(key: string, value: unknown): void;
}

export class MemoryCache implements Cache {
  size() {
    return memoryCache.size;
  }

  get(key: string): unknown {
    return memoryCache.get(key);
  }

  set(key: string, value: unknown): void {
    memoryCache.set(key, value);
  }
}

export class LocalStorageCache implements Cache {
  localStorage: Storage;

  constructor() {
    if (typeof localStorage === "undefined" || localStorage === null) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const LocalStorage = require("node-localstorage").LocalStorage;
      this.localStorage = new LocalStorage("./scratch");
    } else {
      this.localStorage = localStorage;
    }
  }

  get(key: string): unknown {
    const item = this.localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  }

  set(key: string, value: unknown): void {
    this.localStorage.setItem(key, JSON.stringify(value, null, 2));
  }
}

export class IDBCache implements Cache {
  async get(key: string): Promise<unknown> {
    return await idbGet(key);
  }

  set(key: string, value: unknown): void {
    idbSet(key, value);
  }
}

export class CacheManager {
  private cache: Cache;

  constructor(cache: Cache) {
    this.cache = cache;
  }

  get(key: string): unknown {
    return this.cache.get(key);
  }

  set(key: string, value: unknown): void {
    this.cache.set(key, value);
  }
}

export const createCacheManager = (cache: Cache): CacheManager => {
  const manager = new CacheManager(cache);
  return manager;
};
