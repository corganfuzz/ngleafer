import { Component, OnInit } from '@angular/core';
import { latLng, Layer, tileLayer, marker, icon, geoJSON, Marker} from 'leaflet';
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

    public options: any;

    public markers: Marker[];

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

  // options = {
  //   layers: [this.DARK_PNG],
  //   zoom: 3,
  //   center: latLng(11, -40)
  // };

  // markers: Layer[] =
  // [
  //   marker([35, -76], { icon: this.createIcon() }),
  //   marker([36, -81], { icon: this.createIcon() }),
  //   marker([37, -88], { icon: this.createIcon() }),
  //   marker([38, -99], { icon: this.createIcon() }),
  //   marker([39, -111], { icon: this.createIcon() })
  // ];

    createIcon() {
    return icon({
      iconSize: [25, 25],
      iconAnchor: [13, 41],
      iconUrl: 'assets/yellow.png',
    });
  }

    // options = {
    //   layers: [this.DARK_PNG, this.markers],
    //   zoom: 3,
    //   center: latLng(11, -40)
    // };

constructor(public _mapService: MapserviceService) {

 }

  ngOnInit() {
    this._mapService.getGeoJson().subscribe(data => {
         const final = geoJSON(data);
         this.layers = [final];
    });

    this._mapService.getMarkers().subscribe(data => {

      // console.log('markers', data);

        const coords = data.map(coord => {
          const bruh = [coord.lat, coord.lng];
          return bruh;
        });

        console.log('coords', coords);

      // this.markers = marker(coords,
      //   {
      //     icon: icon({
      //       iconSize: [25, 25],
      //       iconAnchor: [13, 41],
      //       iconUrl: 'assets/yellow.png',
      //     })
      //   });

      // this.markers =
      // [
      //   marker(coords, {icon: this.createIcon() })
      // ];


      this.markers =
        [
          marker([35, -76], { icon: this.createIcon() }),
          marker([36, -81], { icon: this.createIcon() }),
          marker([37, -88], { icon: this.createIcon() }),
          marker([38, -99], { icon: this.createIcon() }),
          marker([39, -111], { icon: this.createIcon() })
        ];

        console.log('working', this.markers);

      function createIcon() {
        return icon({
          iconSize: [25, 25],
          iconAnchor: [13, 41],
          iconUrl: 'assets/yellow.png',
        });
      }



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






