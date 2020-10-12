import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {PersonelKayitComponent} from './components/user/personel-kayit/personel-kayit.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {MahalleKayitComponent} from './components/admin/mahalle-kayit/mahalle-kayit.component';
import {AdresKayitComponent} from './components/user/adres-kayit/adres-kayit.component';
import {PersonelListeComponent} from './components/user/personel-liste/personel-liste.component';
import {AdresListeComponent} from './components/user/adres-liste/adres-liste.component';
import {RegisterComponent} from './components/admin/register/register.component';
import {KayitlarComponent} from './components/admin/kayitlar/kayitlar.component';
import {DashboardAdminComponent} from "./components/admin/dashboard-admin/dashboard-admin.component";
import {DashboardUserComponent} from "./components/user/dashboard-user/dashboard-user.component";
import {AdresBilgiComponent} from "./components/user/adres-bilgi/adres-bilgi.component";
import {RotaMapComponent} from "./components/user/rota-map/rota-map.component";
import {GuzergahListeComponent} from "./components/user/guzergah-liste/guzergah-liste.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'adres-kayit',
        component: AdresKayitComponent
      },
      {
        path: 'personel-kayit',
        component: PersonelKayitComponent
      },
      {
        path: 'mahalle-kayit',
        component: MahalleKayitComponent
      },
      {
        path: 'personel-liste',
        component: PersonelListeComponent
      },
      {
        path: 'adres-liste',
        component: AdresListeComponent
      },
      {
        path: 'yeni-kayit',
        component: RegisterComponent
      },
      {
        path: 'kullanıcı-kayitlar',
        component: KayitlarComponent
      },
      {
        path: '',
        component: DashboardUserComponent
      },
      {
        path: 'admin',
        component: DashboardAdminComponent
      },
      {
        path: 'adres-bilgi',
        component: AdresBilgiComponent
      },
      {
        path: 'rota-map',
        component: RotaMapComponent
      },
      {
        path: 'guzergah-liste',
        component: GuzergahListeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
