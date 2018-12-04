import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, 
  MatListModule, MatIconModule, MatTooltipModule, MatExpansionModule, MatDatepickerModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http'
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppComponent } from './app.component';
import { GmudListComponent } from './gmud-list/gmud-list.component';
import { BatsService } from './services/bats.service';
import { ServersService } from './services/servers.service';

@NgModule({
  declarations: [
    AppComponent,
    GmudListComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,BrowserAnimationsModule,
    MatButtonModule, MatIconModule,MatCheckboxModule, MatToolbarModule,
    MatListModule, MatTooltipModule, MatExpansionModule, MatDatepickerModule,
    FlexLayoutModule
  ],
  providers: [BatsService, ServersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
