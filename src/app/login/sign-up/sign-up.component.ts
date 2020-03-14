import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/core/models/usuario-model';
import { AuthFireService } from 'src/app/core/services/auth-fire.service';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  public usuario: UsuarioModel = {password: '', correo: ''};
  public confirmPass: string = '';
  passNoCoincide = false;
  escondidoPass = true;
  escondidoConf = true;

  constructor(
    public authService: AuthFireService,
    ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  submit(formulario: NgForm){    
    if (formulario.value.contrasena !== formulario.value.contrasenaConfirm) {
      this.passNoCoincide = true;
    }else{
      this.passNoCoincide = false;
      this.authService.registroConCorreo(this.usuario);
    }
  }

  iniciarConGoogle(){
    this.authService.loginConGoogle();
  }
}
