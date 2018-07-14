import { Component, OnInit } from '@angular/core';
import { latLng, Layer, tileLayer, marker, icon, geoJSON} from 'leaflet';
// import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { MapserviceService } from '../services/mapservice.service';

@Component({
  selector: 'app-mapper',
  templateUrl: './mapper.component.html',
  styleUrls: ['./mapper.component.css']
})

export class MapperComponent implements OnInit {

    public layersControl: any;
    public layers: Layer[];

    public bullshit: any;


  // adding geojson from a file

DARK_PNG = tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}{r}.' + 'png', {
    detectRetina: true,
    maxZoom: 18,
    attribution: 'My Own Business'
  });

  NEW_TOPO = tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    maxZoom: 18,
    attribution: 'My Second Business'
  });

  WHITE_MAP = tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/til' + 'e/{z}/{y}/{x}', {
    detectRetina: true,
    maxZoom: 18,
    attribution: 'My Third Business'
  });

  options = {
    layers: [this.DARK_PNG],
    zoom: 3,
    center: latLng(54.5260, -105.2551)
  };

  markers: Layer[] =
  [
    marker([35, -76], { icon: this.createIcon() }),
    marker([36, -81], { icon: this.createIcon() }),
    marker([37, -88], { icon: this.createIcon() }),
    marker([38, -99], { icon: this.createIcon() }),
    marker([39, -111], { icon: this.createIcon() })
  ];

  createIcon() {
    return icon({
      iconSize: [25, 25],
      iconAnchor: [13, 41],
      // className: 'dot',
      iconUrl: 'assets/yellow.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    });
  }

constructor(public _mapService: MapserviceService) {

 }

  ngOnInit() {
    this._mapService.getGeoJson().subscribe(data => {
        console.log('yo', data);
         const final = geoJSON(data);
         console.log('final', final);
         this.layers = [final];

    });

    // this.homeworld = this.http.get('/assets/geojson/USA.geo.json')
    // .pipe(mergeMap(character => this.http.get('/assets/geojson/CAN.geo.json')));

    // const usa = this.http.get('/assets/geojson/countries.geo.json');
    // const canada = this.http.get('/assets/geojson/CAN.geo.json');
    // const mexico = this.http.get('/assets/geojson/MEX.geo.json');

    // forkJoin([usa]).subscribe(results => {





      // const final = geoJSON(this.bullshit);

    //   this.layers = [final];
    // });

    // this.http.get<any>('/assets/geojson/USA.geo.json').subscribe(usa => {
    //     this.http.get<any>('/assets/geojson/CAN.geo.json').subscribe(can => {

    // const usaLayer = geoJSON(usa);
    // const canLayer = geoJSON(can);

    // const canLayer = geoJSON(mex);

    // console.log(usa);

    // this.layers = [usaLayer, canLayer];

    this.layersControl = {
      baseLayers: {
        'Tactical Map': this.DARK_PNG,
        'Clear Map': this.WHITE_MAP,
        'Topology Map(new)': this.NEW_TOPO,
      },
    };
  }
}






