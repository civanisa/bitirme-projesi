import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PersonelService {

  url = 'http://localhost:8070/api/kullanici-service/p-kayit';

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {
  }

  getIKayit() {
    return this.http.get(this.url + '/i-kayit/' + window.localStorage.getItem('iKayitId'), this.tokenStorage.getHttpOptions());
  }

  getByIdKayit(id){
    return this.http.get(this.url + '/' + id, this.tokenStorage.getHttpOptions());
  }

  postIKayit(postData) {
    return this.http.post(this.url, postData, this.tokenStorage.getHttpOptions());
  }

  updateKAyit(data) {
    return this.http.put(this.url, data, this.tokenStorage.getHttpOptions());
  }

  deletePKayit(kayitId, kayitBilId) {
    return this.http.post(this.url + '/delete', {
      pKayitId: kayitId,
      kayitBilId: kayitBilId
    }, this.tokenStorage.getHttpOptions());
  }
}
