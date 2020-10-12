import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {Location} from '../../../../services/geocode/location-model';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../../services/auth/token-storage.service';
import {GeocodeService} from '../../../../services/geocode/geocode.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AdresService} from '../../../../services/adres/adres.service';
import {PersonelService} from '../../../../services/personel/personel.service';
import {LatLngLiteral} from '@agm/core';
import {IKayitModel} from '../../../../services/personel/iKayit-model';

@Component({
  selector: 'app-personel-add-dialog',
  templateUrl: './personel-add-dialog.component.html',
  styleUrls: ['./personel-add-dialog.component.css']
})
export class PersonelAddDialogComponent implements OnInit {

  form: any = {
    adSoyad: null,
    kayitBil: {
      aciklama: null,
      telefons: [
        {
          telefon: null,
        }
      ],
      adres: [
        {
          adres: null,
          lat: null,
          lng: null,
        }
      ]
    },
    ikayit_id: null
  };

  // Sivas Kordinatları(lat,lng,zoom)
  private kordinat: any = [39.7498961, 37.0130059, 15];

  // Marker Konumu
  private location: Location;

  // Mahalle Konumu Çizimi
  private fillcolor = '#ccc';
  private paths: Array<LatLngLiteral> = [];

  // Kordinat'a Basınca Kaydeti Aktif Ediyor
  private disabled = true;

  // iKayit
  private iKayitId = null;
  private iKayitData: Array<IKayitModel> = [];

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private geocodeService: GeocodeService,
    private ref: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private adresService: AdresService,
    private personeService: PersonelService,
  ) {
  }

  ngOnInit() {
    // localStorage'da Token Yoksa Login Sayfasına Yönlendirme Yapıyor
    if (!this.tokenStorage.getToken()) {
      this.router.navigateByUrl('/login');
    }
    // iKayit
    this.iKayit();
    // tslint:disable-next-line:radix
    this.iKayitId = parseInt(window.localStorage.getItem('iKayitId'));
  }

  // Fom Post Ediliyor
  onSubmit() {
    this.form.ikayit_id = window.localStorage.getItem('iKayitId');
    this.form.kayitBil.adres[0].lng = this.location.lng;
    this.form.kayitBil.adres[0].lat = this.location.lat;
    this.personeService.postIKayit(this.form)
      .subscribe(res => {
        // console.log(res);
      });
  }

  // Girilen Adresi Tek Bir Değişkene Atıyor
  showLocation() {
    if (this.form.kayitBil.adres[0].adres) {
      this.disabled = false;
      this.addressToCoordinates();
    } else {
      this.snackBar.open('Adres Bilgilerini Doldurunuz', 'Hata!', {
        duration: 2000,
      });
    }
  }

  // Tam Adresin Kordinat Dönüşümünü Yapıyor
  addressToCoordinates() {
    this.geocodeService.geocodeAddress(this.form.kayitBil.adres[0].adres)
      .subscribe((location: Location) => {
        this.location = location;
        this.kordinat[0] = location.lat;
        this.kordinat[1] = location.lng;
        this.ref.detectChanges();
      });
  }

  // Haritadaki Marker'a Basınca Kordinat Bilgi Ekranı Açıyor
  markerDragEnd($event: MouseEvent) {
    // @ts-ignore
    this.location.lat = $event.coords.lat;
    // @ts-ignore
    this.location.lng = $event.coords.lng;
  }

  // iKayit Verilerini Getiriyor
  iKayit() {
    this.adresService.getIKayit().subscribe((res) => {
      Object.keys(res).forEach((key) => {
        this.iKayitData.push({
          id: res[key].id,
          adi: res[key].adi
        });
      });
    }, (err) => {
      console.log(err);
    });
  }
}
