import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppComponent } from './app.component';
import { MapperComponent } from './mapper/mapper.component';
import { ChildComponent } from './child/child.component';
// import { MapserviceService } from './services/mapservice.service';

@NgModule({
  declarations: [
    AppComponent,
    MapperComponent,
    ChildComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LeafletModule.forRoot()
  ],
  providers : [],
  bootstrap: [AppComponent]
})
export class AppModule { }
