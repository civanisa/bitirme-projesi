import {Component, OnInit} from '@angular/core';
import {GuzergahService} from '../../../services/guzergah/guzergah.service';
import {PersonelService} from '../../../services/personel/personel.service';

@Component({
  selector: 'app-guzergah-liste',
  templateUrl: './guzergah-liste.component.html',
  styleUrls: ['./guzergah-liste.component.css']
})
export class GuzergahListeComponent implements OnInit {

  guzergahData: any = [];

  panelOpenState = false;

  constructor(
    private guzerService: GuzergahService,
    private personelSerice: PersonelService,
  ) {
  }

  ngOnInit() {
    let data;
    this.guzerService.getGuzergah()
      .subscribe(res => {
        this.guzergahData = res;
        if (this.guzergahData.length === 0) {
          this.panelOpenState = true;
        }
        for (let i = 0; i < this.guzergahData.length; i++) {
          for (let j = 0; j < this.guzergahData[i].guzergahSira.length; j++) {
            this.personelSerice.getByIdKayit(this.guzergahData[i].guzergahSira[j].kayit_id)
              .subscribe(res => {
                console.log(res);
                data = res;
                this.guzergahData[i].guzergahSira[j].adSoyad = data.adSoyad;
                this.guzergahData[i].guzergahSira[j].telefon = data.kayitBil.telefons[0].telefon;
                this.guzergahData[i].guzergahSira[j].adres = data.kayitBil.adres[0].adres;
                this.guzergahData[i].guzergahSira[j].adresAciklama = data.kayitBil.aciklama;
              });
          }
        }
      });
  }

}
