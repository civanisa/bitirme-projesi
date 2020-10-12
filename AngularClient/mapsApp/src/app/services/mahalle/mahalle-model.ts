import {LatLngLiteral} from '@agm/core';

export interface Mahalle {
  id: any;
  name: any;
  lat: number;
  lng: number;
  zoom: number;
  locations: Array<LatLngLiteral>;
}
