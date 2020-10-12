import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material';
import {PersonelService} from '../../../services/personel/personel.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../services/auth/token-storage.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PersonelUpdateDialogComponent} from '../dialogs/personel-update-dialog/personel-update-dialog.component';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {PersonelAddDialogComponent} from '../dialogs/personel-add-dialog/personel-add-dialog.component';

@Component({
  selector: 'app-personel-liste',
  templateUrl: './personel-liste.component.html',
  styleUrls: ['./personel-liste.component.css']
})
export class PersonelListeComponent implements OnInit {

  iKayitAdi: string;

  // Paginator
  pageIndex = 0;
  pageSize = 8;

  displayedColumns: string[] = ['kayitId', 'adiSoyadi', 'adres', 'telefon', 'adresAciklama', 'actions'];
  data: any;
  dataSource: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private personeService: PersonelService,
    private opendialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    // Token Yoksa Login Sayfasına Yönlendirme Yapıyor
    if (!this.tokenStorage.getToken()) {
      this.router.navigateByUrl('/login');
    }
    // LocalStorage'de iKayitId yoksa adres-liste Sayfasına Yönlendirme Yapıyor
    if (!window.localStorage.getItem('iKayitId')) {
      this.router.navigateByUrl('/dashboard/adres-liste');
    } else {
      this.iKayitAdi = window.localStorage.getItem('iKayitAdi');
    }
    this.personeData();
  }

  // Tablo içi arama yapıyor
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Tabloya verileri çekiyor
  personeData() {
    this.personeService.getIKayit().subscribe((res) => {
      console.log(res);
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
    });
  }

  add() {
    const dialogResult = this.opendialog.open(PersonelAddDialogComponent, {
      width: '1000px',
    });
    dialogResult.afterClosed().subscribe(result => {
      if (result !== undefined && result !== 'false') {
        this.snackBar.open('Yeni Kayit İşlemi Başarılı', 'Başarı!', {
          duration: 3000,
        });
        this.data.push(result);
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.paginator.lastPage();
      }
    });
  }

  update(element) {
    const dialogResult = this.opendialog.open(PersonelUpdateDialogComponent, {
      width: '1000px',
      data: element
    });
    dialogResult.afterClosed().subscribe(result => {
      if (result === 'true') {
        this.snackBar.open('Güncelleme İşlemi Başarılı', 'Başarı!', {
          duration: 3000,
        });
        window.location.reload();
      }
    });
  }

  delete(kayitId, kayitBilId) {
    const dialogResult = this.opendialog.open(DeleteDialogComponent, {
      width: '250px',
      data : 'Kayıt silinecek emin misiniz?'
    });
    dialogResult.afterClosed().subscribe(result => {
      if (result === 'true') {
        this.personeService.deletePKayit(kayitId, kayitBilId)
          .subscribe((res) => {
              this.snackBar.open('Silme İşlemi Başarılı', 'Başarı!', {
                duration: 3000,
              });
              this.data.splice(this.data.indexOf(kayitId), 1);
              this.dataSource = new MatTableDataSource(this.data);
              this.dataSource.paginator = this.paginator;
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
