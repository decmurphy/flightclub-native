import { Injectable } from '@angular/core';

@Injectable()
export class SessionStorageService {

  supported: boolean;
  storage: Storage;

  constructor() {
    this.supported = Storage !== void(0);
    this.storage = window.sessionStorage;
  }

  isSupported(): boolean {
    return this.supported;
  }

  put(key: string, val: string): void {
      this.storage.setItem(key, val);
  }

  get(key: string): string {
      return this.storage.getItem(key);
  }

}
