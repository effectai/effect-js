import { get as idbGet, set as idbSet } from "idb-keyval";

export interface Cache {
  get(key: string): unknown;
  set(key: string, value: unknown): void;
}

export class MemoryCache implements Cache {
  private cache: Map<string, unknown>;

  constructor() {
    this.cache = new Map();
  }

  get(key: string): unknown {
    return this.cache.get(key);
  }

  set(key: string, value: unknown): void {
    this.cache.set(key, value);
  }
}

export class IDBCache implements Cache {
  constructor() {}

  get(key: string): unknown {
    return idbGet(key);
  }

  set(key: string, value: unknown): void {
    idbSet(key, value);
  }
}
