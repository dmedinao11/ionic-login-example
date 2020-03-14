import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { FormsModule } from '@angular/forms';

//Components
import { LoginPage } from './login.page';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';

//Material
import { MaterialModule } from "../core/modules/material/material.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    MaterialModule
    
  ],
  declarations: [
    LoginPage,
    SignInComponent,
    SignUpComponent,
    NotFoundComponent
  ]
})
export class LoginPageModule {}
