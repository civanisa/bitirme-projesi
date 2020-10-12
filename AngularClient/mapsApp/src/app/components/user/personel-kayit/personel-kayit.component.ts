import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../services/auth/token-storage.service';
import {GeocodeService} from '../../../services/geocode/geocode.service';
import {Location} from '../../../services/geocode/location-model';
import {LatLngLiteral} from '@agm/core';
import {MahalleService} from '../../../services/mahalle/mahalle.service';
import {Mahalle} from '../../../services/mahalle/mahalle-model';
import {AdresService} from '../../../services/adres/adres.service';
import {IKayitModel} from '../../../services/personel/iKayit-model';
import {PersonelService} from '../../../services/personel/personel.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-personel-kayit',
  templateUrl: './personel-kayit.component.html',
  styleUrls: ['./personel-kayit.component.css']
})
export class PersonelKayitComponent implements OnInit {

  // Sivas Kordinatları(lat,lng,zoom)
  private kordinat: any = [39.7498961, 37.0130059, 15];

  // Default Şehir
  private sehir = 'Sivas';

  // Form
  private adi;
  private telefon;
  private tamAdress;
  private adresAciklama;

  // Post Data
  postData = {
    adSoyad: null,
    kayitBil: {
      aciklama: null,
      adres: [
        {
          adres: null,
          lat: null,
          lng: null,
        }
      ],
      telefons: [
        {
          telefon: null
        }
      ]
    },
    ikayit_id: null,
  };

  // Mahalle Bilgi (mahalle , Cadde , Apartman)
  private adres: any = [];

  // Mahlalle
  private mahhalleler: any;
  private mahalleId: any;

  // Marker Konumu
  private location: Location;

  // Mahalle Konumu Çizimi
  private fillcolor = '#ccc';
  private paths: Array<LatLngLiteral> = [];

  // iKayit
  private iKayitId = null;
  private iKayitData: Array<IKayitModel> = [];

  // Kordinat'a Basınca Kaydeti Aktif Ediyor
  private disabled = true;

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private mahalleService: MahalleService,
    private geocodeService: GeocodeService,
    private ref: ChangeDetectorRef,
    private adresService: AdresService,
    private personeService: PersonelService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    // localStorage'da Token Yoksa Login Sayfasına Yönlendirme Yapıyor
    if (!this.tokenStorage.getToken()) {
      this.router.navigateByUrl('/login');
    }
    // localStorage'da Mahalle Varsa Diziye Atıyor
    if (localStorage.getItem('Mahalle')) {
      this.mahhalleler = JSON.parse(localStorage.getItem('Mahalle'));
    } else {
      this.mahalleService.getAllMahalle();
      window.location.reload();
    }
    // iKayit
    this.iKayit();
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

  // Form Post
  addRecord() {
    if (this.adi && this.telefon && this.iKayitId) {
      // Formda Bu Alan Boş İse Default Değer Atanıyor
      if (!this.adresAciklama) {
        this.adresAciklama = 'Ev-Adresi';
      }
      this.postData.adSoyad = this.adi;
      this.postData.kayitBil.aciklama = this.adresAciklama;
      this.postData.kayitBil.adres[0].adres = this.tamAdress;
      this.postData.kayitBil.adres[0].lat = this.location.lat;
      this.postData.kayitBil.telefons[0].telefon = this.telefon;
      this.postData.ikayit_id = this.iKayitId;
      this.postData.kayitBil.adres[0].lng = this.location.lng;
      this.personeService.postIKayit(this.postData).subscribe((res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });
      this.snackBar.open('Kayit İşlemi Başarılı', 'Başarı!', {
        duration: 2000,
      });
      this.formClear();
    } else {
      this.snackBar.open('Tüm Formu Doldurunuz', 'Hata!', {
        duration: 2000,
      });
    }
  }

  // Formu Temizliyor
  formClear() {
    this.telefon = null;
    this.adres[1] = null;
    this.adi = null;
    this.adres[2] = null;
    this.adres[0] = null;
    this.adresAciklama = null;
    this.tamAdress = null;
    this.iKayitId = null;
    this.mahalleId = null;
  }

  // Girilen Adresi Tek Bir Değişkene Atıyor
  showLocation() {
    if (this.adres[0] && this.adres[1] && this.adres[2]) {
      this.tamAdress = this.adres[0] + this.adres[1] + ' ' + this.adres[2] + ' ' + this.sehir;
      console.log(this.tamAdress);
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
    this.geocodeService.geocodeAddress(this.tamAdress)
      .subscribe((location: Location) => {
        this.location = location;
        this.kordinat[0] = location.lat;
        this.kordinat[1] = location.lng;
        this.kordinat[2] += 2;
        this.ref.detectChanges();
      });
  }

  // Seçilen Mahallenin Haritadaki Konumunu Ciziyor
  onSelectMahalle() {
    const value = this.mahhalleler[this.mahalleId];
    this.adres[0] = value.name + ' Mahallesi ';
    this.paths = value.locations;
    this.kordinat[0] = value.lat;
    this.kordinat[1] = value.lng;
    this.kordinat[2] = value.zoom;
  }

  // Haritadaki Marker'a Basınca Kordinat Bilgi Ekranı Açıyor
  markerDragEnd($event: MouseEvent) {
    // @ts-ignore
    this.location.lat = $event.coords.lat;
    // @ts-ignore
    this.location.lng = $event.coords.lng;
  }
}
