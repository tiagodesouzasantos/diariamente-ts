import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, 
  MatListModule, MatIconModule, MatTooltipModule } from '@angular/material';

import { AppComponent } from './app.component';
import { GmudListComponent } from './gmud-list/gmud-list.component';

@NgModule({
  declarations: [
    AppComponent,
    GmudListComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,
    MatButtonModule, MatIconModule,MatCheckboxModule, MatToolbarModule,
    MatListModule, MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
