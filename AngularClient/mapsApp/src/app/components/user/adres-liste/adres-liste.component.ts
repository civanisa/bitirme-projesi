import {Component, OnInit} from '@angular/core';
import {AdresService} from '../../../services/adres/adres.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../services/auth/token-storage.service';

@Component({
  selector: 'app-adres-liste',
  templateUrl: './adres-liste.component.html',
  styleUrls: ['./adres-liste.component.css']
})
export class AdresListeComponent implements OnInit {

  adresData: any = [];

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private adresService: AdresService,
  ) {
  }

  ngOnInit() {
    // Token Yoksa Login Sayfasına Yönlendirme Yapıyor
    if (!this.tokenStorage.getToken()) {
      this.router.navigateByUrl('/login');
    }
    this.getAdres();
  }

  getAdres() {
    this.adresService.getIKayit().subscribe((res) => {
      this.adresData = res;
    });
  }

  setIKayit(id) {
    window.localStorage.setItem('iKayitId', id);
  }

  openPersonel(id, adi) {
    this.setIKayit(id);
    window.localStorage.setItem('iKayitAdi', adi);
    this.router.navigateByUrl('/dashboard/personel-liste');
  }

  openProfil(id) {
    this.setIKayit(id);
    this.router.navigateByUrl('/dashboard/adres-bilgi');
  }

  openMaps(id) {
    this.setIKayit(id);
    this.router.navigateByUrl('/dashboard/rota-map');
  }

  openGuzergah(id, adi) {
    this.setIKayit(id);
    window.localStorage.setItem('iKayitAdi', adi);
    this.router.navigateByUrl('/dashboard/guzergah-liste');
  }
}
