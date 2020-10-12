import {Component, OnInit} from '@angular/core';
import {MahalleService} from '../../services/mahalle/mahalle.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../services/auth/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private mahalleService: MahalleService
  ) {
  }

  ngOnInit() {
    // Token Yoksa Login Sayfasına Yönlendirme Yapıyor
    if (!this.tokenStorage.getToken()) {
      this.router.navigateByUrl('/login');
    }
    this.mahalleService.getAllMahalle();
  }
}
