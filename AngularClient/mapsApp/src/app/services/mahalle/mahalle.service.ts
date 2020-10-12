import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenStorageService} from '../auth/token-storage.service';
import {Mahalle} from './mahalle-model';

@Injectable({
  providedIn: 'root'
})

export class MahalleService {

  url = 'http://localhost:8070/api/mahalle-service/mahalle';

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {
  }

  getAllMahalle() {
    this.http.get(this.url, this.tokenStorage.getHttpOptions())
      .subscribe((res) => {
        Object.keys(res).forEach((key) => {
          Object.keys(res[key].locations).forEach((keys) => {
            delete res[key].locations[keys].id;
            delete res[key].locations[keys].mahalle_id;
          });
          this.saveMahalle(res);
        });
      });
  }

  addMahalle(formData) {
    return this.http.post(this.url, formData, this.tokenStorage.getHttpOptions());
  }

  saveMahalle(mahalle: Object) {
    window.localStorage.setItem('Mahalle', JSON.stringify(mahalle));
  }


}
