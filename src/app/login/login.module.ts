import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { FormsModule } from '@angular/forms';

//Providers
import { NativePageTransitions} from '@ionic-native/native-page-transitions/ngx';

//Components
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';

//Material
import { MaterialModule } from "../core/modules/material/material.module";
import { LoginPage } from './login.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    MaterialModule
    
  ],
  declarations: [
    SignInComponent,
    SignUpComponent,
    NotFoundComponent,
    LoginPage
  ],

  providers: [
    NativePageTransitions
  ],

  exports: [
    LoginPage
  ]
})
export class LoginPageModule {}
