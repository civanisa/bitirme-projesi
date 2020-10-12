import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
// Componentler
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {PersonelKayitComponent} from './components/user/personel-kayit/personel-kayit.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {MahalleKayitComponent} from './components/admin/mahalle-kayit/mahalle-kayit.component';
import {AdresListeComponent} from './components/user/adres-liste/adres-liste.component';
import {RegisterComponent} from './components/admin/register/register.component';
import {KayitlarComponent} from './components/admin/kayitlar/kayitlar.component';
import {KayitDialogComponent} from './components/admin/dialogs/kayit-dialog/kayit-dialog.component';
import {AdresKayitComponent} from './components/user/adres-kayit/adres-kayit.component';
import {UpdateDialogComponent} from './components/admin/dialogs/update-dialog/update-dialog.component';
import {DashboardAdminComponent} from './components/admin/dashboard-admin/dashboard-admin.component';
import {DashboardUserComponent} from './components/user/dashboard-user/dashboard-user.component';
import {PersonelUpdateDialogComponent} from './components/user/dialogs/personel-update-dialog/personel-update-dialog.component';
import {DeleteDialogComponent} from './components/user/dialogs/delete-dialog/delete-dialog.component';
import {PersonelAddDialogComponent} from './components/user/dialogs/personel-add-dialog/personel-add-dialog.component';
import { AdresBilgiComponent } from './components/user/adres-bilgi/adres-bilgi.component';
import { AdresUpdateDialogComponent } from './components/user/dialogs/adres-update-dialog/adres-update-dialog.component';

import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
// Auth için Gerekli Servis
import {httpInterceptorProviders} from './services/auth/auth-interceptor';
// Google Maps Paketi
import {AgmCoreModule} from '@agm/core';
// Konum Bulma Servisi
import {GeocodeService} from './services/geocode/geocode.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// Angular Material
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {
  MatDialogModule,
  MatIconModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material';
import {PersonelListeComponent} from './components/user/personel-liste/personel-liste.component';
import {MatRadioModule} from '@angular/material';
import {MatPaginatorModule} from '@angular/material';

// Paginator Ayarları
import {MatPaginatorIntl} from '@angular/material/paginator';
import {MatPaginatorIntlCro} from './services/custom-paginator';
import { RotaMapComponent } from './components/user/rota-map/rota-map.component';
import { RotaInfoDialogComponent } from './components/user/dialogs/rota-info-dialog/rota-info-dialog.component';
import { GuzergahListeComponent } from './components/user/guzergah-liste/guzergah-liste.component';
import {MatExpansionModule} from "@angular/material/expansion";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PersonelKayitComponent,
    NavigationComponent,
    DashboardComponent,
    MahalleKayitComponent,
    AdresKayitComponent,
    PersonelListeComponent,
    RegisterComponent,
    AdresListeComponent,
    KayitlarComponent,
    KayitDialogComponent,
    UpdateDialogComponent,
    DashboardAdminComponent,
    DashboardUserComponent,
    PersonelUpdateDialogComponent,
    DeleteDialogComponent,
    PersonelAddDialogComponent,
    AdresBilgiComponent,
    AdresUpdateDialogComponent,
    RotaMapComponent,
    RotaInfoDialogComponent,
    GuzergahListeComponent,
  ],
  entryComponents: [
    KayitDialogComponent,
    UpdateDialogComponent,
    PersonelUpdateDialogComponent,
    DeleteDialogComponent,
    PersonelAddDialogComponent,
    AdresUpdateDialogComponent,
    RotaInfoDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'apiKey'
    }),
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatRadioModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    MatSortModule,
    MatDialogModule,
    MatExpansionModule
  ],
  providers: [
    httpInterceptorProviders,
    GeocodeService,
    {provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
