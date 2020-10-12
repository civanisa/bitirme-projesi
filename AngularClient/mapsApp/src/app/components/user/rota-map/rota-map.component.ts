import {Component, OnInit} from '@angular/core';
import {PersonelService} from '../../../services/personel/personel.service';
import {RotaInfoDialogComponent} from '../dialogs/rota-info-dialog/rota-info-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AdresService} from '../../../services/adres/adres.service';
import {GuzergahService} from '../../../services/guzergah/guzergah.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../services/auth/token-storage.service';

@Component({
  selector: 'app-rota-map',
  templateUrl: './rota-map.component.html',
  styleUrls: ['./rota-map.component.css']
})
export class RotaMapComponent implements OnInit {

  getData: any = {};
  data: any = [];

  // Sağ Üst Card
  cardAktif = false;
  cardAdSoyad = '';
  cardAdres = '';

  gBorder = [{bColor: 'g-border-red', color: 'g-red'},
    {bColor: 'g-border-green', color: 'g-green'},
    {bColor: 'g-border-blue', color: 'g-blue'},
    {bColor: 'g-border-yellow', color: 'g-yellow'},
    {bColor: 'g-border-deeppink', color: 'g-deeppink'},
    {bColor: 'g-border-brown', color: 'g-brown'},
    {bColor: 'g-border-purple', color: 'g-purple'},
    {bColor: 'g-border-orange', color: 'g-orange'},
    {bColor: 'g-border-navy-blue', color: 'g-navy-blue'},
    {bColor: 'g-border-jade', color: 'g-jade'},
  ];

  gDefaultIconUrl = '../../../../assets/images/icons/gray.png';

  gMarkerIconUrl = [
    {iconUrl: '../../../../assets/images/icons/red.png'},
    {iconUrl: '../../../../assets/images/icons/green.png'},
    {iconUrl: '../../../../assets/images/icons/blue.png'},
    {iconUrl: '../../../../assets/images/icons/yellow.png'},
    {iconUrl: '../../../../assets/images/icons/deeppink.png'},
    {iconUrl: '../../../../assets/images/icons/brown.png'},
    {iconUrl: '../../../../assets/images/icons/purple.png'},
    {iconUrl: '../../../../assets/images/icons/orange.png'},
    {iconUrl: '../../../../assets/images/icons/navy-blue.png'},
    {iconUrl: '../../../../assets/images/icons/jade.png'},
  ];

  gCardAktif = 0;

  clickSayisi = 0;
  cardGuzergah: any = [];

  // işyeri & okul verisi
  iKayit: any = {
    kayitBil: {
      adres: [
        {lat: null, lng: null}
      ]
    }
  };

  // Sivas Kordinatları(lat,lng,zoom)
  private kordinat: any = [39.7498961, 37.0130059, 12.5];


  private eskiKayit = false;
  private yeniKayit = true;

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private personeService: PersonelService,
    private opendialog: MatDialog,
    private snackBar: MatSnackBar,
    private adresService: AdresService,
    private guzergahService: GuzergahService,
  ) {
  }

  ngOnInit() {
    // Token Yoksa Login Sayfasına Yönlendirme Yapıyor
    if (!this.tokenStorage.getToken()) {
      this.router.navigateByUrl('/login');
    }
    this.personeData();
    this.defaultListe();
    this.getByIkayit();
    this.getGuzergah();
  }

  getGuzergah() {
    let res;
    this.guzergahService.getGuzergah()
      .subscribe(response => {
        if (response) {
          res = response;
          if (res.length === 0) {
            this.eskiKayit = true;
            this.yeniKayit = false;
          }
          for (let i = 0; i < res.length; i++) {
            if (i !== 0) {
              this.gCardAdd();
              this.newListe();
            }
            for (let j = 0; j < res[i].guzergahSira.length; j++) {
              for (let t = 0; t < this.data.length; t++) {
                for (let p = 0; p < this.data[t].length; p++) {
                  if (this.data[t][p].id === res[i].guzergahSira[j].kayit_id) {
                    console.log(this.gMarkerIconUrl[i].iconUrl);
                    this.data[t].iconUrl = this.gMarkerIconUrl[i].iconUrl;
                  }
                }
              }
              this.cardGuzergah[i].data[j] = res[i].guzergahSira[j];
            }
          }
          this.cardAktif = res.length;
        }
      });
  }

  defaultListe() {
    this.cardGuzergah[0] = {
      bColor: this.gBorder[0].bColor,
      dataDoluluk: 0,
      data: this.newListe()
    };
  }

  getByIkayit() {
    this.adresService.getByIKayit(window.localStorage.getItem('iKayitId'))
      .subscribe(res => {
        this.iKayit = res;
      });
  }

  personeData() {
    this.personeService.getIKayit().subscribe((res) => {
      this.getData = res;
      let t;
      for (let i = 0; i < this.getData.length; i++) {
        t = 0;
        const data = [];
        data[t] = this.getData[i];
        for (let j = i + 1; j < this.getData.length; j++) {
          // Aynı Adrestekileri Buluyor
          if (this.getData[i].kayitBil.adres[0].lat === this.getData[j].kayitBil.adres[0].lat &&
            this.getData[i].kayitBil.adres[0].lng === this.getData[j].kayitBil.adres[0].lng) {
            t++;
            data[t] = this.getData[j];
            this.getData = this.getData.filter(item => item !== this.getData[j]);
          }
        }
        // @ts-ignore
        data.iconUrl = this.gDefaultIconUrl;
        // @ts-ignore
        data.label = (t + 1).toString();
        this.data[i] = data;
      }
    });
  }

  mouseOver(data) {
    this.cardAktif = true;
    this.cardAdres = data[0].kayitBil.adres[0].adres;
    for (let i = 0; i < data.length; i++) {
      this.cardAdSoyad += data[i].adSoyad + ' ';
    }
  }

  mouseOut() {
    this.cardAktif = false;
    this.cardAdres = '';
    this.cardAdSoyad = '';
  }

  gCardAdd() {
    this.clickSayisi++;
    if (this.clickSayisi < 10) {
      this.cardGuzergah[this.clickSayisi] = {
        bColor: this.gBorder[this.clickSayisi].bColor,
        dataDoluluk: 0,
        data: this.newListe()
      };
      this.gClick(this.clickSayisi);
    } else {
      this.snackBar.open('Liste 10 Adet İle Sınırlandırılmıştır.', 'Sınırlama!', {
        duration: 3000,
      });
    }
  }

  gClick(id) {
    this.cardGuzergah[this.gCardAktif].bColor = '';
    this.gCardAktif = id;
    this.cardGuzergah[id].bColor = this.gBorder[id].bColor;
  }

  markerClick(data, index) {
    let degis = true;
    for (let i = 0; i < data.length; i++) {
      const doluluk = this.cardGuzergah[this.gCardAktif].dataDoluluk;
      for (let t = 0; t < this.cardGuzergah.length; t++) {
        for (let j = 0; j < this.cardGuzergah[t].data.length; j++) {
          if (this.cardGuzergah[t].data[j].kayit_id === data[i].id) {
            if (t === this.gCardAktif) {
              degis = false;
              break;
            }
            this.cardGuzergah[t].data[j].style = '';
            this.cardGuzergah[t].data[j].kayit_id = null;
            this.cardGuzergah[t].dataDoluluk--;
            this.siraKaydir();
            break;
          }
        }
      }
      if (degis) {
        if (doluluk > 19) {
          this.snackBar.open('20 Adetten Fazla Kişi Eklenemez', 'Sınırlama!', {
            duration: 3000,
          });
          break;
        } else {
          this.cardGuzergah[this.gCardAktif].data[doluluk].style
            = this.gBorder[this.gCardAktif].color;
          this.cardGuzergah[this.gCardAktif].data[doluluk].kayit_id
            = data[i].id;
          this.cardGuzergah[this.gCardAktif].dataDoluluk++;
          this.data[index].iconUrl = this.gMarkerIconUrl[this.gCardAktif].iconUrl;
        }
      }
    }
  }

  siraKaydir() {
    for (let i = 0; i < this.cardGuzergah.length; i++) {
      for (let t = 0; t < this.cardGuzergah[i].data.length; t++) {
        if (this.cardGuzergah[i].data[t].kayit_id == null && t !== 19) {
          this.cardGuzergah[i].data[t].kayit_id = this.cardGuzergah[i].data[t + 1].kayit_id;
          this.cardGuzergah[i].data[t].style = this.cardGuzergah[i].data[t + 1].style;
          this.cardGuzergah[i].data[t + 1].kayit_id = null;
          this.cardGuzergah[i].data[t + 1].style = '';
        }
      }
    }
  }

  gInfo(data) {
    const list = [];
    let say = 0;
    for (let i = 0; i < 20; i++) {
      if (data.data[i].kayit_id != null) {
        this.personeService.getByIdKayit(data.data[i].kayit_id)
          .subscribe(res => {
            list[say] = res;
            say++;
          });
      }
    }
    const dialogResult = this.opendialog.open(RotaInfoDialogComponent, {
      width: '1200px',
      height: '500px',
      data: list
    });
    dialogResult.afterClosed().subscribe(result => {
      if (result !== undefined) {
        // Sıralama İşlemi Yapılabilir
        // Geri Dönüş İçin Burayı Kullan
        // console.log();
      }
    });
  }

  gClearMap() {
    const dialogResult = this.opendialog.open(DeleteDialogComponent, {
      width: '200px',
      data: 'Tüm Listeler Silinecek emin misiniz?'
    });
    dialogResult.afterClosed().subscribe(result => {
      if (result === 'true') {
        this.gClear();
        this.snackBar.open('Silme İşlemi Başarılı', 'Başarı!', {
          duration: 3000,
        });

      }
    });
  }

  gClear() {
    this.cardGuzergah = [];
    this.defaultListe();
    for (let i = 0; i < this.data.length; i++) {
      this.data[i].iconUrl = '../../../../assets/images/icons/gray.png';
    }
  }

  gSaveMap() {
    const guzergah = [];
    for (let i = 0; i < this.cardGuzergah.length; i++) {
      guzergah.push({
        adi: 'liste' + (i + 1),
        aciklama: 'liste',
        guzergahSira: this.getList(this.cardGuzergah[i]),
        ikayit_id: window.localStorage.getItem('iKayitId')
      });
      // guzergah[i].guzergahSira.push();
    }
    this.guzergahService.postGuzergah(guzergah)
      .subscribe(res => {
        this.router.navigateByUrl('/dashboard/guzergah-liste');
      });
  }

  getList(liste) {
    const list = [];
    let say = 0;
    for (let j = 0; j < 20; j++) {
      if (liste.data[j].kayit_id != null) {
        list[say] = liste.data[j];
        say++;
      }
    }
    return list;
  }

  gKayit() {
    this.router.navigateByUrl('/dashboard/guzergah-liste');
  }

  newListe() {
    return [
      {kayit_id: null, sira: 1, style: ''},
      {kayit_id: null, sira: 2, style: ''},
      {kayit_id: null, sira: 3, style: ''},
      {kayit_id: null, sira: 4, style: ''},
      {kayit_id: null, sira: 5, style: ''},
      {kayit_id: null, sira: 6, style: ''},
      {kayit_id: null, sira: 7, style: ''},
      {kayit_id: null, sira: 8, style: ''},
      {kayit_id: null, sira: 9, style: ''},
      {kayit_id: null, sira: 10, style: ''},
      {kayit_id: null, sira: 11, style: ''},
      {kayit_id: null, sira: 12, style: ''},
      {kayit_id: null, sira: 13, style: ''},
      {kayit_id: null, sira: 14, style: ''},
      {kayit_id: null, sira: 15, style: ''},
      {kayit_id: null, sira: 16, style: ''},
      {kayit_id: null, sira: 17, style: ''},
      {kayit_id: null, sira: 18, style: ''},
      {kayit_id: null, sira: 19, style: ''},
      {kayit_id: null, sira: 20, style: ''},
    ];
  }


  // Ekle Bunu
  asTheCrowFlies(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    console.log(d);
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
}
