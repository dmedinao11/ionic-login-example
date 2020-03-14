import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../core/models/usuario-model';
import { AuthFireService } from 'src/app/core/services/auth-fire.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  public usuario: UsuarioModel = {password: '', correo: ''};
  escondidoPass = true;

  constructor(private authService: AuthFireService) { }

  ngOnInit() {}

  submit(formulario: NgForm){
    console.log(formulario);
    this.authService.loginConCorreo(this.usuario);
  }

  

}
