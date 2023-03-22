import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { userReducer } from './store/reducers/user.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HeaderModule } from './modules/header/header.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ user: userReducer }),
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    HeaderModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
