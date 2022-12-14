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
import {
  FontAwesomeModule,
  FaIconLibrary,
  FaConfig,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { MapFilterComponent } from './map-filter/map-filter.component';
import { FeedSelectorComponent } from './feed-selector/feed-selector.component';
import {CardComponent} from './card/card.component';
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./home/home.component";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {CardListComponent} from "./card-list/card-list.component";
import {FeedNavigationComponent} from "./feed-navigation/feed-navigation.component";

@NgModule({
  declarations: [
    CardComponent,
    CardListComponent,
    FeedNavigationComponent,
    AppComponent,
    HomeComponent,
    MapComponent,
    MapMarkerComponent,
    TreeMapMarkerComponent,
    PoiPopupComponent,
    MapFilterComponent,
    FeedSelectorComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FontAwesomeModule,
    LeafletModule,
    HttpClientModule,
    ScrollingModule
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
