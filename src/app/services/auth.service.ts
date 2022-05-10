import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLogged: boolean = false;
  constructor(private angularFireAuth: AngularFireAuth,

  ) {
    angularFireAuth.authState.subscribe((auth) => {
      console.log('authState', this.angularFireAuth.authState);
      this.isLogged = auth?.email ? true : false;

    });
  }

  async registry(email: string, password: string) {
    try {
      return await this.angularFireAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('error en registro', error);
      return null;
    }
  }
  async login(email: string, password: string) {
    try {
      return await this.angularFireAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('error en registro', error);
      return null;
    }
  }
  getUserLogged() {
    return this.isLogged;
  }

  out() {
    this.angularFireAuth.signOut();
    console.log('cerró sesion');
  }
}
