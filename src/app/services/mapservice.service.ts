import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MapserviceService {

  private _url: string = '/assets/geojson/BRA.geo.json';

  constructor(private http: HttpClient) { }

  getGeoJson (): Observable<any> {
    return this.http.get<any>(this._url);
  }
}
