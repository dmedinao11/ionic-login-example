import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

//Models
import { UsuarioModel } from 'src/app/core/models/usuario-model';

//Servicio
import { AuthFireService } from 'src/app/core/services/auth-fire.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  public usuario: UsuarioModel = {password: '', correo: ''};
  escondidoPass = true;

  cargando: boolean;

  constructor(
    private authService: AuthFireService,
    public loadingController: LoadingController
    ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    this.cargando = true;
    this.authService.observarAuthEstado().subscribe(
      () => {
        this.cargando = false;
      }
    );
  }

  async submit(formulario: NgForm){
    const resultado = this.authService.loginConCorreo(this.usuario);
    
    const loading = await this.loadingController.create({
      message: 'Espere por favor',
      mode: "md",
      spinner: "crescent"
    }); 

    resultado
    .then(
      (data) => {
        loading.dismiss();
      })
    .catch(
      (error) => {
        loading.dismiss();
      }
    );

    loading.present();
  }


  async iniciarConGoogle() {
    const resultado = this.authService.loginConGoogle();   
    
    const loading = await this.loadingController.create({
      message: 'Espere por favor',
      mode: "md",
      spinner: "crescent"
    }); 

    resultado
      .then(
        (data) => {
          loading.dismiss();
        })
      .catch(
        (error) => {
          loading.dismiss();
        }
      );

      loading.present();
  }

}
