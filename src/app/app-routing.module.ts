import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';

//Guards
import { LoginGuard } from './core/guards/login.guard';
import { HomeGuard } from './core/guards/home.guard';

const routes: Routes = [
  
  { 
    path: 'home', 
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [HomeGuard]
  },
    
    {
      path: 'login',
      loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
      canActivate: [LoginGuard]
    },
    
    {
      path: '404',
      component: NotFoundComponent
    },
    
    { 
    path: '', 
    redirectTo: 'home',  
    pathMatch: 'full' 
    },

    
/*     {
    path:'**',
    pathMatch: 'full',
    redirectTo: '404'
  }, */
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
