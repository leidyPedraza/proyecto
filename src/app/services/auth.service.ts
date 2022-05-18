import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserI } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLogged: boolean = false;
  constructor(
    private angularFireAuth: AngularFireAuth,


  ) {
    angularFireAuth.authState.subscribe((auth) => {
      console.log('authState', this.angularFireAuth.authState);
      this.isLogged = auth?.email ? true : false;

    });
  }

  /**
   * Método para crear un usuario con email y password
   * @param data 
   * @returns Usuario
   */
  registry(data: UserI) {
    return this.angularFireAuth.createUserWithEmailAndPassword(data.email, data.password);
  }

  /**
   * Método para autenticar el inicio de sesión
   * @param email  
   * @param password 
   * @returns 
   */
  login(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  /**
   * Método para saber si el usuario está loggeado
   * @returns boolean
   */
  getUserLogged() {
    return this.isLogged;
  }

  /**
   * Método para cerrar sesion
   */
  out() {
    this.angularFireAuth.signOut();
  }

  /**
   * Metodo para obtener el estado de autenticación
   * @returns 
   */
  stateUser() {
    return this.angularFireAuth.authState;
  }

  /**
   * Método para obetener el ID de un usuario
   * @returns 
   */
  async getUid() {
    const user = await this.angularFireAuth.currentUser;
    if (user) {
      return user.uid;
    } else {
      return null;
    }
  }
}