import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, 
  MatListModule, MatIconModule, MatTooltipModule, MatExpansionModule,
  MatDatepickerModule, MatProgressSpinnerModule, MatDialogModule, MatFormFieldModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http'
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppComponent } from './app.component';
import { GmudListComponent } from './gmud-list/gmud-list.component';
import { BatsService } from './services/bats.service';
import { ServersService } from './services/servers.service';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    GmudListComponent,
    LoadingScreenComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,BrowserAnimationsModule,
    MatButtonModule, MatIconModule,MatCheckboxModule, MatToolbarModule,
    MatListModule, MatTooltipModule, MatExpansionModule, MatDatepickerModule,
    MatProgressSpinnerModule, MatDialogModule, MatFormFieldModule,
    FlexLayoutModule
  ],
  providers: [BatsService, ServersService],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
