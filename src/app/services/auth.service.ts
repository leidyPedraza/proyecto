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

  registry(data: UserI) {
    return this.angularFireAuth.createUserWithEmailAndPassword(data.email,data.password);
  }

  login(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }
  getUserLogged() {
    return this.isLogged;
  }

  out() {
    this.angularFireAuth.signOut();
  }
  stateUser(){
   return this.angularFireAuth.authState;
  }
}
