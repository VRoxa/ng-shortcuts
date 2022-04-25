import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgShortcutsModule } from 'projects/ng-shortcuts/src/public-api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgShortcutsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
