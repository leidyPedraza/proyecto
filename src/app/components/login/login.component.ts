import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserI } from 'src/app/model/model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user = {
    email: '',
    password: '',
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private firestoreService: FirestoreService) { }

  /**
   * Método para iniciar sesión
   */
  async logger() {
    console.log(this.user);
    const res = await this.authService.login(this.user.email, this.user.password)
      .catch(error => {
        console.log('error', error);
      })
    if (res) {
      this.getIdUser();
      console.log('respuesta', res);
      this.router.navigate(['/bienvenido']);
    }
  }

  getInfoUser(uid: string) {
    this.firestoreService.getDoc<UserI>('datas', uid).subscribe(res => {
      if (res && localStorage.getItem('Logged') == "true") {
        localStorage.setItem('userInfo', JSON.stringify(res));
        console.log('uidRes', res);
      }
    })
  }

  async getIdUser() {
    const id = await this.authService.getUid();
    if (id) {
      localStorage.setItem('uid', id);
      this.getInfoUser(id);
    }
  }
}

