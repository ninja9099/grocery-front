import { Injectable } from '@angular/core';
import { getItem, removeItem, setItem, StorageItem } from '../utils';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(!!getItem(StorageItem.Token));

  constructor() {}

  get isLoggedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }


  signOut(): void {
    removeItem(StorageItem.Token);
    this.isLoggedIn$.next(false);
  }
}
