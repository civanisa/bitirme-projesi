import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Location} from '../../../../services/geocode/location-model';
import {LatLngLiteral} from '@agm/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../../services/auth/token-storage.service';
import {GeocodeService} from '../../../../services/geocode/geocode.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AdresService} from '../../../../services/adres/adres.service';
import {IKayitModel} from '../../../../services/personel/iKayit-model';
import {PersonelService} from '../../../../services/personel/personel.service';

@Component({
  selector: 'app-personel-update-dialog',
  templateUrl: './personel-update-dialog.component.html',
  styleUrls: ['./personel-update-dialog.component.css']
})
export class PersonelUpdateDialogComponent implements OnInit {

  form: any = {};

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
    @Inject(MAT_DIALOG_DATA) public data: any,
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
    // Form Dolduruloyor
    this.formFill();
  }

  // Form Dolduruloyor
  formFill() {
    this.form = this.data;
    this.iKayitId = this.data.ikayit_id;
    this.kordinat[2] -= 4;
    this.showLocation();
  }

  // Fom Post Ediliyor
  onSubmit() {
    this.form.ikayit_id = this.iKayitId;
    this.form.kayitBil.adres[0].lat = this.location.lat;
    this.form.kayitBil.adres[0].lng = this.location.lng;
    this.personeService.updateKAyit(this.form)
      .subscribe(res => {
        console.log(res);
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
        this.kordinat[2] += 4;
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
