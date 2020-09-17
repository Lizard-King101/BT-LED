import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LEDService } from './led.service';
import { FormsModule } from '@angular/forms';

import { ComponentModule } from './components/components.module';
import { LedContainer } from './setup/ledcontainer/led-container.page';
import { GroupSelector } from './setup/groupselector/group-select.page';
import { LayerSelect } from './components/layerselect/layer-select.component';
import { LayerPage } from './filter/layer/layer.page';


@NgModule({
  declarations: [
    AppComponent,
    LedContainer,
    GroupSelector,
    LayerSelect,
    LayerPage
  ],
  entryComponents: [
    LedContainer,
    GroupSelector,
    LayerSelect,
    LayerPage
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ComponentModule, 
    IonicModule.forRoot(), 
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    LEDService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
