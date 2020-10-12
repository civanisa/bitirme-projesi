import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdresService {

  url = 'http://localhost:8070/api/kullanici-service/i-kayit';

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {
  }

  getIKayit() {
    return this.http.get(this.url + '/user/' + this.tokenStorage.getUserId(), this.tokenStorage.getHttpOptions());
  }

  getByIKayit(iKayitId) {
    return this.http.get(this.url + '/' + iKayitId, this.tokenStorage.getHttpOptions());
  }

  postIKayit(postData) {
    return this.http.post(this.url, postData, this.tokenStorage.getHttpOptions());
  }

  updateIKayit(postData) {
    return this.http.put(this.url, postData, this.tokenStorage.getHttpOptions())
  }

  deleteIKayit(KayitId, KayitBilId) {
    return this.http.post(this.url + '/delete', {
      iKayitId: KayitId,
      iKayitBilId: KayitBilId
    }, this.tokenStorage.getHttpOptions());
  }
}
