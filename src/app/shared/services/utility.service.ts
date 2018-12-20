import { Injectable } from '@angular/core';
import { EndpointScheme } from '@shared/interfaces/endpointScheme';

@Injectable()
export class UtilityService {

  constructor() { }

  parseQueryString(queryString) {
      const keyVals = queryString.split('&');
      const paramMap = {};
      for (let i = 0; i < keyVals.length; i++) {
          const keyVal = keyVals[i].split('=');
          const vals = keyVal.length === 2 ? keyVal[1].split('%20') : '';

          paramMap[decodeURIComponent(keyVal[0])] = [];
          for (let j = 0; j < vals.length; j++) {
              paramMap[decodeURIComponent(keyVal[0])].push(decodeURIComponent(vals[j] || ''));
          }
      }
      return paramMap;
  }

  serialize(obj) {
      if (obj === undefined) {
          return '';
      }
      return Object.keys(obj).reduce(function(a, k) {
          a.push(encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]));
          return a;
      }, []).join('&');
  }

  buildEndpoint(scheme: EndpointScheme) {
      let ep = scheme.protocol + '://' + scheme.host;
      if (scheme.port) {
          ep = ep + ':' + scheme.port;
      }
      return ep;
  }

  navigateTo(url: string, target?: string): void {
    window.open(url, target);
  }

}
