//Core
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

//Firebase y Google
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { GooglePlus } from '@ionic-native/google-plus/ngx'

//Models
import { UsuarioModel } from '../models/usuario-model';
import { AuthUserModel } from '../models/auth-user.model';

//Modals
import { SignUpCompleteInformationComponent } from 'src/app/login/modals/sign-up-complete-information/sign-up-complete-information.component';

//Swal
import Swal from 'sweetalert2'



@Injectable({
  providedIn: 'root'
})
export class AuthFireService {

  public estaAutenticado = false;
  public usuarioAutenticado: firebase.User;

  public cargando = false;


  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private gPlus: GooglePlus,
    private platform: Platform,
    private modalController: ModalController,
  ) {

    this.auth.authState.subscribe(
      async (datosUsuario: firebase.User) => {
        if (!datosUsuario) {
          this.estaAutenticado = false;
          return;
        } else {

          this.usuarioAutenticado = datosUsuario;

          let nombre = this.usuarioAutenticado.displayName;
          let foto = this.usuarioAutenticado.photoURL;

          console.warn(nombre + " | " + foto);
          

          if (nombre === null || foto === null) {
            this.cargando = true;
            const dataModelNombre = await this.completarLoginCorreo();
            
            const resp = await datosUsuario.updateProfile({
              displayName: dataModelNombre['data']['userName']['nombre'],
              photoURL: dataModelNombre['data']['userName']['imagen']
            });

          } 

          this.cargando = false;

          this.estaAutenticado = true;
          router.navigateByUrl('/home');
        }
      }
    );
  }

  //Login
  loginConGoogle() {
    if (this.platform.is('cordova')) {
      return this.nativeGoogleAuth();
    } else {
      return this.webGoogleAuth();
    }
  }

  private async nativeGoogleAuth(): Promise<any> {
    const gPlusUser = await this.gPlus.login({});
    let credential = firebase.auth.GoogleAuthProvider.credential(null, gPlusUser.accessToken);
    return this.auth.signInWithCredential(credential)
      .then(
        (resp) => {
          console.log(resp);
          this.estaAutenticado = true;
        }
      )
      .catch(
        (error) => {
          this.mostrarError(error);
          this.estaAutenticado = false;
        }
      );
  }

  private webGoogleAuth(): Promise<any> {
    return this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      .then(
        async (data) => {
          this.estaAutenticado = true;
          this.router.navigateByUrl('/home');

        }
      )
      .catch(
        error => {
          this.estaAutenticado = false;
          this.mostrarError(error);
        }
      );
  }

  loginConCorreo(usuario: UsuarioModel): Promise<any> {
    return this.auth.signInWithEmailAndPassword(usuario.correo, usuario.password)
      .then(
        (data) => {
          this.estaAutenticado = true;
          console.log(data);


        }
      )
      .catch(
        (error) => {
          this.estaAutenticado = false;
          this.mostrarError(error);

        }
      );
  }


  //Registro
  registroConCorreo(usuario: UsuarioModel) {
    return this.auth.createUserWithEmailAndPassword(usuario.correo, usuario.password)
      .then(
        (user) => {
          this.estaAutenticado = true;
        }
      )
      .catch(
        (error) => {
          this.mostrarError(error);
          this.estaAutenticado = false;
        }
      );

  }


  private async completarLoginCorreo() {
    const modalComplete = await this.modalController.create({
      component: SignUpCompleteInformationComponent,
    });

    modalComplete.present();
    return modalComplete.onDidDismiss();
  }





  //Cerrar sesion
  logout() {
    if (this.platform.is('cordova')) {
      this.gPlus.logout();
    }
    this.usuarioAutenticado = null;
    this.estaAutenticado = false;
    this.auth.signOut();
    this.router.navigateByUrl('login');
  }

  //Validaciones
  observarAuthEstado(): Observable<firebase.User> {
    return this.auth.authState;
  }

  //Alertas
  mostrarError(error: any) {
    let mensajeDeError: string;
    let mostrarFooter = false;
    let htmlFooter = '';

    switch (error.code) {
      case 'auth/email-already-in-use':
        mensajeDeError = '¡Este correo ya fué registrado!'

        break;

      case 'auth/user-not-found':
        mensajeDeError = 'Email no registrado';

        let contenido = `[routerLink]="['../signUp']"`;
        htmlFooter = `<a href=# ${contenido}>Regístrate</a>`;
        mostrarFooter = true;

        break;

      case 'auth/wrong-password':
        mensajeDeError = 'Contraseña incorrecta'
        break;

      default:
        mensajeDeError = 'Sucedió un problema desconocido :(';
        mostrarFooter = true;
        break;
    }
    Swal.fire({
      icon: 'error',
      title: 'Oh oh..',
      text: mensajeDeError,
      footer: (mostrarFooter ? htmlFooter : null),
    })
  }
}


