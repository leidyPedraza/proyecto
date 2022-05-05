import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  async registry(email: string, password: string) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('error en registro' + error);
      return null;
    }
  }
}
