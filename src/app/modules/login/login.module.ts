import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { GoogleBtnComponent } from './components/google-btn/google-btn.component';

@NgModule({
  declarations: [LoginComponent, LoginFormComponent, GoogleBtnComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class LoginModule {}
