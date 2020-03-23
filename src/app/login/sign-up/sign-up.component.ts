import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';

//Models
import { UsuarioModel } from 'src/app/core/models/usuario-model';

//Servicio
import { AuthFireService } from 'src/app/core/services/auth-fire.service';

//Modal
import { SignUpCompleteInformationComponent } from '../modals/sign-up-complete-information/sign-up-complete-information.component';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  public usuario: UsuarioModel = { password: '', correo: '' };
  public confirmPass: string = '';
  passNoCoincide = false;
  escondidoPass = true;
  escondidoConf = true;

  cargando: boolean;

  constructor(
    public authService: AuthFireService,
    public loadingController: LoadingController,
  ) {
  }

  ngOnInit() {
    this.usuario = new UsuarioModel('', '');
    this.cargando = true;
    this.authService.observarAuthEstado().subscribe(
      () => {
        this.cargando = false;
      }
    );
  }

  //Login con correo
  async submit(formulario: NgForm) {
    if (formulario.value.contrasena !== formulario.value.contrasenaConfirm) {
      this.passNoCoincide = true;
    } else {
      this.passNoCoincide = false;

      const loading = await this.loadingController.create({
        message: 'Espere por favor',
        mode: "md",
        spinner: "crescent"
      }); 

      loading.present();   
      await this.authService.registroConCorreo(this.usuario);
      loading.dismiss();
         
    }
  }


    

  //Login con google
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
