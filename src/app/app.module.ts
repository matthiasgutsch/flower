import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { InterceptorModule } from './shared/interceptors/interceptor.module';

// Modal Pages
import { ImagePageModule } from './pages/modal/image/image.module';
import { SearchFilterPageModule } from './pages/modal/search-filter/search-filter.module';
import { ItemDetailsPageModule } from './pages/modal/item-details/item-details.module';
import { fakeBackendProvider } from './helpers';
import { TruncatePipe } from './app.pipe';

// Components
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ComponentsModule } from './components/component.module';
import { PreloadImageComponent } from './preload-image/preload-image.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { EventProvider } from './event-provider.service';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxProgressiveImgLoaderModule } from 'ngx-progressive-img-loader';
import { ReactiveFormsModule } from "@angular/forms";
import { FilterPipe } from './filter.pipe';
import { BasicAuthInterceptor, ErrorInterceptor } from './helpers';

export function HttpLoaderFactory(http: HttpClient) {
return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [AppComponent, NotificationsComponent, FilterPipe, TruncatePipe, PreloadImageComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ComponentsModule,
    ReactiveFormsModule,
    NgxProgressiveImgLoaderModule,
    IonicModule.forRoot({
      mode: 'md'
  }),
    AppRoutingModule,
    HttpClientModule,
    ImagePageModule,
    SearchFilterPageModule,
    ItemDetailsPageModule,
    InterceptorModule,
    TranslateModule.forRoot({
      loader: {
        provide:  TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
       }
     })
    ],
  exports: [
    PreloadImageComponent
  ],
  entryComponents: [NotificationsComponent],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    EventProvider,
    //{ provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
       { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule {}
