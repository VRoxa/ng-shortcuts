import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgShortcutsModule } from 'projects/ng-shortcuts/src/public-api';

import { AppComponent } from './app.component';
import { MutedComponent } from './muted.component';

@NgModule({
  declarations: [
    AppComponent,
    MutedComponent
  ],
  imports: [
    BrowserModule,
    NgShortcutsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
