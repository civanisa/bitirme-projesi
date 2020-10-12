import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {JwtResponse} from './jwt-response';
import {AuthLoginInfo} from './login-info';
import {SignUpInfo} from './signup-info';
import {TokenStorageService} from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:8070/api/auth';
  private loginUrl = 'http://localhost:8070/api/auth/signin';
  private signupUrl = 'http://localhost:8070/api/auth/signup';

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {
  }

  getallUsers() {
    return this.http.get(this.url, this.tokenStorage.getHttpOptions());
  }

  deleteUser(id) {
    return this.http.delete(this.url + '/delete/' + id);
  }

  updateUser(id, element) {
    return this.http.put(this.url + '/update/' + id, element);
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }
}
