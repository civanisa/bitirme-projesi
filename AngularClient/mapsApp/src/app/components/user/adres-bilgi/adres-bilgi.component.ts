import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../services/auth/token-storage.service";
import {AdresService} from "../../../services/adres/adres.service";
import {DeleteDialogComponent} from "../dialogs/delete-dialog/delete-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdresUpdateDialogComponent} from "../dialogs/adres-update-dialog/adres-update-dialog.component";

@Component({
  selector: 'app-adres-bilgi',
  templateUrl: './adres-bilgi.component.html',
  styleUrls: ['./adres-bilgi.component.css']
})
export class AdresBilgiComponent implements OnInit {

  data: any = {
    adi: 'null',
    kayitBil: {
      aciklama: 'null',
      telefons: [
        {
          telefon: 'null',
        }
      ],
      adres: [
        {
          adres: 'null',
          lat: 'null',
          lng: 'null',
        }
      ]
    },
    user_id: null
  };

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private adresService: AdresService,
    private opendialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    // Token Yoksa Login Sayfasına Yönlendirme Yapıyor
    if (!this.tokenStorage.getToken()) {
      this.router.navigateByUrl('/login');
    }
    if (!window.localStorage.getItem('iKayitId')) {
      this.router.navigateByUrl('/dashboard/adres-liste');
    }
    this.getIKayit();
  }

  getIKayit() {
    this.adresService.getByIKayit(window.localStorage.getItem('iKayitId'))
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
      });
  }

  update() {
    const dialogResult = this.opendialog.open(AdresUpdateDialogComponent, {
      width: '1000px',
      data: this.data
    });
    dialogResult.afterClosed().subscribe(result => {
      if (result === 'true') {
        this.snackBar.open('Güncelleme İşlemi Başarılı', 'Başarı!', {
          duration: 3000,
        });
      }
    });
  }

  delete() {
    const dialogResult = this.opendialog.open(DeleteDialogComponent, {
      width: '250px',
      data: 'Kurumun listesinde veri var ise silme başarısız olacak! Kurum silinecek emin misiniz?'
    });
    dialogResult.afterClosed().subscribe(result => {
      if (result === 'true') {
        this.adresService.deleteIKayit(this.data.id, this.data.kayitBil.id)
          .subscribe((res) => {
              this.snackBar.open('Silme İşlemi Başarılı', 'Başarı!', {
                duration: 3000,
              });
              this.router.navigateByUrl('/dashboard/adres-liste');
            },
            error => {
              this.snackBar.open('Silme İşlemi Başarısız', 'Bağlı Veri Var!', {
                duration: 3000,
              });
            }
          );
      }
    });
  }
}
