import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const USERNAME_ID = 'AuthUserId';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor() { }

  signOut() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USERNAME_KEY);
    window.localStorage.removeItem(USERNAME_ID);
    window.localStorage.removeItem(AUTHORITIES_KEY);
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }
  // Tokeni Getiriyor
  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  // Http İsteği İçin Başlık Oluşturuyor
  public getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization : this.getToken()
      })
    };
  }



  public saveUsername(username: string) {
    window.localStorage.removeItem(USERNAME_KEY);
    window.localStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return localStorage.getItem(USERNAME_KEY);
  }

  public saveUserId(id: string){
    window.localStorage.removeItem(USERNAME_ID);
    window.localStorage.setItem(USERNAME_ID, id);
  }

  public getUserId(): string{
    return localStorage.getItem(USERNAME_ID);
  }

  public saveAuthorities(authorities: string[]) {
    window.localStorage.removeItem(AUTHORITIES_KEY);
    window.localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (localStorage.getItem(TOKEN_KEY)) {
      JSON.parse(localStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }

    return this.roles;
  }
}
