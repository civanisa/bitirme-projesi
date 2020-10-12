import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../services/auth/token-storage.service';
import {MahalleService} from "../../../services/mahalle/mahalle.service";
import {error} from "util";

@Component({
  selector: 'app-mahalle-kayit',
  templateUrl: './mahalle-kayit.component.html',
  styleUrls: ['./mahalle-kayit.component.css']
})
export class MahalleKayitComponent implements OnInit {

  form: any = {};

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private mahalleService: MahalleService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    // Token Yoksa Login Sayfasına Yönlendirme Yapıyor
    if (!this.tokenStorage.getToken()) {
      this.router.navigateByUrl('/login');
    }
  }

  onSubmit() {
    this.form.locations = JSON.parse(this.form.locations);
    this.mahalleService.addMahalle(this.form)
      .subscribe(res => {
          this.snackBar.open('Kayit İşlemi Başarılı', 'Başarı!', {
            duration: 3000,
          });
          this.form = {};
        }, error => {
          this.snackBar.open('Kayit İşlemi Başarısız', 'Tekrar Deneyiniz!', {
            duration: 3000,
          });
        }
      );
  }
}
