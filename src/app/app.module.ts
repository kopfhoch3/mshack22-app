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
import {
  FontAwesomeModule,
  FaIconLibrary,
  FaConfig,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { MapFilterComponent } from './map-filter/map-filter.component';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { TreeMapClusterComponent } from './tree-map-cluster/tree-map-cluster.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapMarkerComponent,
    TreeMapMarkerComponent,
    TreeMapClusterComponent,
    MapFilterComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FontAwesomeModule,
    LeafletModule,
    LeafletMarkerClusterModule,
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
export class AppModule {
  constructor(
    private readonly library: FaIconLibrary,
    private readonly faConfig: FaConfig
  ) {
    this.faConfig.defaultPrefix = 'fal';
    library.addIconPacks(fas, fab, fal);
  }
}
