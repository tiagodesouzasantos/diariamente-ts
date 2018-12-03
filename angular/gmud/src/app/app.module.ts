import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, 
  MatListModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { GmudListComponent } from './gmud-list/gmud-list.component';
import { BatsService } from './bats.service';  

@NgModule({
  declarations: [
    AppComponent,
    GmudListComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,BrowserAnimationsModule,
    MatButtonModule, MatIconModule,MatCheckboxModule, MatToolbarModule,
    MatListModule, MatTooltipModule
  ],
  providers: [BatsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
