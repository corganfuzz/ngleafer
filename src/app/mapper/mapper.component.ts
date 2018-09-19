import {Component, OnInit} from '@angular/core';
import { latLng, Layer, tileLayer, marker, icon, geoJSON, Marker, Map} from 'leaflet';
import { MapserviceService } from '../services/mapservice.service';
import { ICoords } from './coords';

@Component({
  selector: 'app-mapper',
  templateUrl: './mapper.component.html',
  styleUrls: ['./mapper.component.css'],
})

export class MapperComponent implements OnInit {

    public layersControl: any;

    public layers: Layer[];

    public bullshit: any;

    public options: any;

    public markers: Marker[] = [];

    public data: ICoords[];

    public map: Map;

DARK_PNG = tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.' + 'png', {
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



constructor(public _mapService: MapserviceService) {}

  ngOnInit() {

    this._mapService.getGeoJson().subscribe(data => {
         const options = {'color': 'red'};
         const final = geoJSON(data, options);
         this.layers = [final];
    });

    this._mapService.getMarkers().subscribe(data => {

      this.data = data;
      
        data.map(a => {
          const lat = a.lat;
          const lng = a.lng;
          const name = a.name;

          const newMarker = marker(
            [lat, lng], {
              icon: icon({
                iconSize: [25, 25],
                iconUrl: 'assets/yellow.png',
              })
            }
          );
          newMarker.bindPopup('<p>' + name + '</p>', {autoPan: true});

          this.markers.push(newMarker);

          console.log('total', this.markers);
      });
    });

    this.options = {
      layers: [this.DARK_PNG],
      zoom: 3,
      center: latLng(11, -40)
    };

    this.layersControl = {
      baseLayers: {
        'Tactical Map': this.DARK_PNG,
        'Clear Map': this.WHITE_MAP,
        'Topology Map(new)': this.NEW_TOPO,
      },
    };
  }
}






