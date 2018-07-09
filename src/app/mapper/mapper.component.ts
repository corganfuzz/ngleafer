import { Component, OnInit } from '@angular/core';
import { latLng, Layer, tileLayer, marker, icon, geoJSON} from 'leaflet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mapper',
  templateUrl: './mapper.component.html',
  styleUrls: ['./mapper.component.css']
})

export class MapperComponent implements OnInit {

  // adding geojson from a file

  DARK_PNG = tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png', {
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

  // layersControl = {
  //       baseLayers: {
  //         'Tactical Map': this.DARK_PNG,
  //         'Clear Map': this.WHITE_MAP,
  //         'Topology Map(new)': this.NEW_TOPO,
  //       },
  //       // overlays: {
  //       //   'USA' : usaLayer
  //       // }
  // };

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

constructor(private http: HttpClient) { }

ngOnInit() {
  this.http.get < any > ('/assets/geojson/USA.geo.json')
  .subscribe(usa => {
    const usaLayer = geoJSON(usa);
    console.log(usaLayer);

     this.layersControl = {
      baseLayers: {
        'Tactical Map': this.DARK_PNG,
        'Clear Map': this.WHITE_MAP,
        'Topology Map(new)': this.NEW_TOPO,
      },
      overlays: {
        'USA' : usaLayer
      }
    };

    this.options = {
      layers: [this.DARK_PNG],
      zoom: 3,
      center: latLng(54.5260, -105.2551)
    };
  });

}






