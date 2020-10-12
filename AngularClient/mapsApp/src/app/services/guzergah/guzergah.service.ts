import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GuzergahService {

  url = 'http://localhost:8070/api/guzergah-service/guzergah/';

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {
  }

  getGuzergah() {
    return this.http.get(this.url + 'i-kayit/' + window.localStorage.getItem('iKayitId'), this.tokenStorage.getHttpOptions());
  }

  postGuzergah(list) {
    return this.http.post(this.url + 'all', list, this.tokenStorage.getHttpOptions());
  }
}
