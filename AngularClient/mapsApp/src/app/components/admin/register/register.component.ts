import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../services/auth/token-storage.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';
import {SignUpInfo} from '../../../services/auth/signup-info';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;

  isSignUpFailed = true;
  errorMessage = '';

  selected = 'user';

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
      this.selected,
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
