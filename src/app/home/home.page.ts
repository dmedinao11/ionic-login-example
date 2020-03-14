import { Component } from '@angular/core';
import { AuthFireService } from '../core/services/auth-fire.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private authService: AuthFireService) {}

  cerrarSesion(){
    console.log(this.authService.estaAutenticado + " hola");
    this.authService.logout();
    console.log(this.authService.estaAutenticado);
    
  }

}
