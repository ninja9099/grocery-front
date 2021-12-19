import { Injectable } from '@angular/core';
import {HttpResponse} from "@angular/common/http";

@Injectable()
export class UtilityService {
  public static convertObjectToJson(res: HttpResponse<any>): any {
    return JSON.parse(JSON.stringify(res.body));
  }
  public static setLocalStorage(property: string, value: string): void {
    localStorage.setItem(property, value);
  }
  public static setMultiLocalStorage(array: string[][]): void {
    array.forEach((item: string[]) => {
      localStorage.setItem(item[0], item[1]);
    });
  }
  public static getLocalStorage(property: string) {
      return localStorage.getItem(property);
  }
  public static removeItemLocalStorage(property: string) {
    if (localStorage.getItem(property)) {
      localStorage.removeItem(property);
    }
  }
  public static clearLocalStorage() {
    localStorage.clear();
  }
  public static createParameterizedUrl(url: string, params: any): string {
    let newUrl = url;
    Object.keys(params).forEach(param => {
      const regex = new RegExp('{' + param + '}', 'g');
      newUrl = newUrl.replace(regex, params[param]);
    });
    return newUrl;
  }
}
