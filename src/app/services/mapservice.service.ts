import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MapserviceService {

  private _url = '/assets/wellscountries.geo.json';
  private _markers = '../../assets/wellsmarkers/wells.json';

  constructor(private http: HttpClient) {
    // this.http.get(this._url).subscribe(data => {
    //   console.log('countries', data);
    // });
  }

  getGeoJson(): Observable<any> {
    return this.http.get<any>(this._url);
  }

  getMarkers(): Observable<any> {
   return this.http.get<any>(this._markers);
  }
}
