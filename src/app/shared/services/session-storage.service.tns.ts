import { Injectable } from '@angular/core';
import * as appSettings from 'tns-core-modules/application-settings';

@Injectable()
export class SessionStorageService {

  constructor() {
  }

  isSupported(): boolean {
    return true;
  }

  put(key: string, val: string): void {
    appSettings.remove(key);
    appSettings.setString(key, val);
  }

  get(key: string): string {
    return appSettings.getString(key) || '';
  }

}
