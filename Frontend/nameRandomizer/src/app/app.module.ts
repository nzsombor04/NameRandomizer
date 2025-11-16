import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NamelistComponent } from './components/namelist/namelist.component';
import { MainviewComponent } from './components/mainview/mainview.component';
import { RandompickComponent } from './components/randompick/randompick.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigService } from './services/config.service';

@NgModule({
  declarations: [
    AppComponent,
    NamelistComponent,
    MainviewComponent,
    RandompickComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [provideHttpClient(), {
    provide: APP_INITIALIZER,
    useFactory: (cfg: ConfigService) => () => cfg.load(),
    deps: [ConfigService],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
