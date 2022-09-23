import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './map/map.component';
import { MapMarkerComponent } from './map-marker/map-marker.component';
import { TreeMapMarkerComponent } from './tree-map-marker/tree-map-marker.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DeviceIdInterceptorService } from './global/device-id-interceptor.service';
import { PoiPopupComponent } from './poi-popup/poi-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapMarkerComponent,
    TreeMapMarkerComponent,
    PoiPopupComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    LeafletModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DeviceIdInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
