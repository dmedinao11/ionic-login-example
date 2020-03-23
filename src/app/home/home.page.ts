import { Component } from '@angular/core';
import { AuthFireService } from '../core/services/auth-fire.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public authService: AuthFireService) {
    console.log();
    
  }

  cerrarSesion(){
    this.authService.logout();    
  }

}
