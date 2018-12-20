import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  supported: boolean;
  storage: Storage;

  constructor() {
    this.supported = Storage != null && Storage !== void (0);
    this.storage = window.localStorage;
  }

  isSupported(): boolean {
    return this.supported;
  }

  put(key: string, val: string): void {
    this.storage.removeItem(key);
    this.storage.setItem(key, val);
  }

  get(key: string): string {
    return this.storage.getItem(key);
  }

}
