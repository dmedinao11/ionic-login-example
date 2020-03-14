import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UsuarioModel } from '../models/usuario-model';
import { Router } from '@angular/router';
import { map } from "rxjs/operators";
import { Observable, PartialObserver } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthFireService {

  public estaAutenticado = false;
  public usuario: UsuarioModel;


  constructor(private auth: AngularFireAuth, private router: Router) {
    this.usuario = new UsuarioModel();

    this.auth.authState.subscribe(
      datosUsuario => {
        if (!datosUsuario) {
          this.estaAutenticado = false;
          return;
        } else {
          this.estaAutenticado = true;
          console.log(datosUsuario);
          router.navigateByUrl('/home')
        }
      }
    )
  }
  
  //Login
  loginConGoogle() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider())
    .then(
      data => {
        this.estaAutenticado = true;
        console.log(data);
      }
    )
    .catch(
      error => {
        this.estaAutenticado = false;
        console.warn(error);   
      }
    );
  }
  
  loginConCorreo(usuario: UsuarioModel){
    this.auth.signInWithEmailAndPassword(usuario.correo, usuario.password)
    .then(
      (data) => {
        this.estaAutenticado = true;
        console.log(data);
        
      }
    )
    .catch(
      (data) => {
        this.estaAutenticado = false;
        console.log(data);
        
      }
    );
  }


  //Registro
  registroConCorreo(usuario: UsuarioModel){
    return this.auth.createUserWithEmailAndPassword(usuario.correo, usuario.password)
    .then(
      data => {
        this.estaAutenticado = true;
        console.log(data);
      }
    )
    .catch(
      error => {
        this.estaAutenticado = false;
        console.warn(error);
        
      }
    );
                                                                                   
  }


  //Cerrar sesion
  logout() {
    this.usuario = {};
    this.estaAutenticado = false;
    this.auth.signOut();
    this.router.navigateByUrl('login');
  }
}


