import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../../services/auth/token-storage.service';
import {AuthService} from '../../../../services/auth/auth.service';
import {MatSnackBar} from '@angular/material';
import {SignUpInfo} from '../../../../services/auth/signup-info';

@Component({
  selector: 'app-kayit-dialog',
  templateUrl: './kayit-dialog.component.html',
  styleUrls: ['./kayit-dialog.component.css']
})
export class KayitDialogComponent implements OnInit {

  form: any = {roles: 'user'};
  signupInfo: SignUpInfo;

  isSignUpFailed = true;
  errorMessage = '';

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
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
    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password,
      this.form.roles,
    );
    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        this.isSignUpFailed = false;
        this.snackBar.open('Kayit İşlemi Başarılı', 'Başarı!', {
          duration: 300,
        });
      },
      error => {
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
        this.snackBar.open('Kayit İşlemi Başarısız Tekrar Deneyiniz', 'Hata!', {
          duration: 3000,
        });
      }
    );
    this.form = {};
  }

}
