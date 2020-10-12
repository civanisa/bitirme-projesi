import {Injectable} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {of} from 'rxjs';
import {tap, map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {Location} from './location-model';

declare var google: any;

@Injectable()
export class GeocodeService {

  private geocoder: any;

  constructor(private mapLoader: MapsAPILoader) {
  }

  private initGeocoder() {
    this.geocoder = new google.maps.Geocoder();
  }

  private waitForMapsToLoad(): Observable<boolean> {
    if (!this.geocoder) {
      return fromPromise(this.mapLoader.load())
        .pipe(
          tap(() => this.initGeocoder()),
          map(() => true)
        );
    }
    return of(true);
  }

  geocodeAddress(location: string ): Observable<Location> {
    // @ts-ignore
    return this.waitForMapsToLoad().pipe(
      // filter(loaded => loaded),
      switchMap(() => {
        return new Observable(observer => {
          this.geocoder.geocode({address: location}, (results, status) => {
            // tslint:disable-next-line:triple-equals
            if (status == google.maps.GeocoderStatus.OK) {
              observer.next({
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              });
            } else {
              console.log('Error - ', results, ' & Status - ', status);
              observer.next({lat: 0, lng: 0});
            }
            observer.complete();
          });
        });
      })
    );
  }
}
