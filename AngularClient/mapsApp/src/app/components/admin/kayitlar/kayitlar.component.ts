import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {KayitDialogComponent} from '../dialogs/kayit-dialog/kayit-dialog.component';
import {UpdateDialogComponent} from '../dialogs/update-dialog/update-dialog.component';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../services/auth/token-storage.service';

@Component({
  selector: 'app-kayitlar',
  templateUrl: './kayitlar.component.html',
  styleUrls: ['./kayitlar.component.css']
})
export class KayitlarComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'roles', 'actions'];
  dataSource: any;

  addData: any = {id: null, name: '0', username: '0', email: '0', roles: [{name: null}]};

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private opendialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    // Token Yoksa Login Sayfasına Yönlendirme Yapıyor
    if (!this.tokenStorage.getToken()) {
      this.router.navigateByUrl('/login');
    }
    this.getAll();
  }

  getAll() {
    this.authService.getallUsers().subscribe((res) => {
      this.dataSource = res;
    });
  }

  add() {
    const dialogResult = this.opendialog.open(KayitDialogComponent, {
      width: '500px'
    });
    dialogResult.afterClosed().subscribe(result => {
      if (result !== 'false') {
        this.snackBar.open('Kullanıcı Ekleme İşlemi Başarılı', 'Başarı!', {
          duration: 300,
        });
        window.location.reload();
        // this.addData.name = result.name;
        // this.addData.username = result.username;
        // this.addData.email = result.email;
        // this.addData.roles[0].name = result.roles;
        // this.dataSource.push(this.addData);
        // this.dataSource = new MatTableDataSource(this.dataSource);
      }
    });
  }

  delete(id) {
    this.authService.deleteUser(id)
      .subscribe(data => {
        this.snackBar.open('Silme İşlemi Başarılı', 'Başarı!', {
          duration: 3000,
        });
        this.dataSource.splice(this.dataSource.indexOf(id), 1);
        this.dataSource = new MatTableDataSource(this.dataSource);
      }, error => {
        this.snackBar.open('Silme İşlemi Başarısız', 'Bağlı Veri Var!', {
          duration: 3000,
        });
      });
  }

  duzenle(element) {
    const dialogResult = this.opendialog.open(UpdateDialogComponent, {
      width: '500px',
      data: element,
    });
    dialogResult.afterClosed().subscribe(result => {
      if (result !== 'false') {
        console.log(result);
        this.snackBar.open('Güncelleme İşlemi Başarılı', 'Başarı!', {
          duration: 300,
        });
        window.location.reload();
      }
    });
  }
}
