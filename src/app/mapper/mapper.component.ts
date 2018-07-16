import {Component, OnInit} from '@angular/core';
import { latLng, Layer, tileLayer, marker, icon, geoJSON, Marker} from 'leaflet';
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

    public markers: Marker[];

    public data: ICoords[];

  // adding geojson from a file

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

constructor(public _mapService: MapserviceService) {

 }

  ngOnInit() {
    this._mapService.getGeoJson().subscribe(data => {
         const final = geoJSON(data);
         this.layers = [final];
    });

    this._mapService.getMarkers().subscribe(data => {
      // this.zone.run(() => {

      this.data = data;
      // console.log('markers', data);

      // if (data.length > 0) {
        data.map(a => {
          const lat = a.lat;
          const lng = a.lng;
          const name = a.name;


          // console.log('lats', lat);
          // console.log('lngs', lng);

          const newMarker = marker(
            [lat, lng], {
              icon: icon({
                iconSize: [25, 25],
                iconAnchor: [13, 41],
                iconUrl: 'assets/yellow.png',
              })
            }
          );
          newMarker.bindPopup('<p>' + name + '</p>', {autoPan: true});
          // console.log('newmarker', newMarker);
          // this.markers.push(newMarker);
          this.markers = [newMarker];
          console.log('total', this.markers);
        // });
      });
      // }

        // const coords = data.map((a, index) => {
        // let lat = a.lat;
        // let lng = a.lng;

        //   // const bruh = marker([coord.lat, coord.lng]);
        //   // return bruh;
        // });

        // console.log('coords', coords);

      // function createIcon() {
      //   return icon({
      //     iconSize: [25, 25],
      //     iconAnchor: [13, 41],
      //     iconUrl: 'assets/yellow.png'
      //   });
      // }

      // this.markers = marker(coords,
      //   {
          // icon: icon({
          //   iconSize: [25, 25],
          //   iconAnchor: [13, 41],
          //   iconUrl: 'assets/yellow.png',
          // })
      //   });

      // this.markers.push(coords);

      // function createIcon2() {
      //   return icon({
      //     iconSize: [25, 25],
      //     iconAnchor: [13, 41],
      //     iconUrl: 'assets/yellow.png',
      //   });
      // }


      // this.markers =
      //   [
      //     marker([35, -76], { icon: createIcon2() }),
      //     marker([36, -81], { icon: createIcon2() }),
      //     marker([37, -88], { icon: createIcon2() }),
      //     marker([38, -99], { icon: createIcon2() }),
      //     marker([39, -111], { icon: createIcon2() })
      //   ];

      //   console.log('working', this.markers);





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






