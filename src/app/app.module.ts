import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApiStatusService } from './api-status.service'
import { HttpClientModule } from '@angular/common/http'
import { MatButtonModule } from '@angular/material'

import { AppComponent } from './app.component';
import { ApiCardComponent } from './components/api-card/api-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    ApiCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [ApiStatusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
