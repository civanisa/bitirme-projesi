import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../services/auth/token-storage.service';
import {Router} from '@angular/router';
import {Location} from '../../../services/geocode/location-model';
import {GeocodeService} from '../../../services/geocode/geocode.service';
import {MahalleService} from '../../../services/mahalle/mahalle.service';
import {LatLngLiteral} from '@agm/core';
import {AdresService} from '../../../services/adres/adres.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-adres-kayit',
  templateUrl: './adres-kayit.component.html',
  styleUrls: ['./adres-kayit.component.css']
})
export class AdresKayitComponent implements OnInit {

  // Sivas Kordinatları(lat,lng,zoom)
  private kordinat: any = [39.7498961, 37.0130059, 15];

  // Default Şehir
  private sehir = 'Sivas';

  // Form
  private adi: any;
  private telefon: any;
  private tamAdress: string;
  private adresAciklama: any;

  // Post Data
  postData = {
    adi: null,
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
      ],
    },
    user_id: window.localStorage.getItem('AuthUserId')
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

  // Kordinat'a Basınca Kaydeti Aktif Ediyor
  private disabled = true;

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private geocodeService: GeocodeService,
    private mahalleService: MahalleService,
    private ref: ChangeDetectorRef,
    private adresService: AdresService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    // Token Yoksa Login Sayfasına Yönlendirme Yapıyor
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
    this.adresService.getIKayit();
  }

  // Formu Post Ediyor
  addRecord() {
    if (this.adi && this.telefon) {
      // Formda Bu Alan Boş İse Default Değer Atanıyor
      this.postData.kayitBil.aciklama = 'İş-Adresi';
      this.postData.adi = this.adi;
      this.postData.kayitBil.adres[0].lat = this.location.lat;
      this.postData.kayitBil.adres[0].adres = this.tamAdress;
      this.postData.kayitBil.adres[0].lng = this.location.lng;
      this.postData.kayitBil.telefons[0].telefon = this.telefon;
      console.log(this.postData);
      this.adresService.postIKayit(this.postData)
        .subscribe((res) => {
          if (res[0].status === 200) {
            console.log(res);
          }
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
    this.adi = null;
    this.telefon = null;
    this.adres[0] = null;
    this.adres[1] = null;
    this.adres[2] = null;
    this.adresAciklama = null;
    this.tamAdress = null;
    this.mahalleId = null;
  }

  // Girilen Adresi Tek Bir Değişkene Atıyor
  showLocation() {
    if (this.adres[0] && this.adres[1] && this.adres[2]) {
      this.tamAdress = this.adres[0] + this.adres[1] + this.adres[2] + this.sehir;
      console.log(this.tamAdress);
      this.addressToCoordinates();
      this.disabled = false;
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
  onSelect() {
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
