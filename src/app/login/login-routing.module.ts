import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { SignInComponent } from './sign-in/sign-in.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    children: [
      {path: 'signIn', component: SignInComponent},
      {path: 'signUp', component: SignUpComponent},
      {path: '404', component: NotFoundComponent},
      {path:'', pathMatch:'full', redirectTo:'signUp'},
      //{path:'**', pathMatch:'full', redirectTo:'404'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
