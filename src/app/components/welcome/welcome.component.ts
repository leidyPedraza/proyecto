import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserI } from 'src/app/model/model';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  uid: string = null as any;
  userInfo: UserI = null as any;
  roles: 'usuario' | 'admin' | undefined = null as any;
  data: UserI = {
    name: null as any,
    age: null as any,
    email: null as any,
    uid: null as any,
    password: null as any,
    roles: null as any
  }


  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
  ) {
    this.getUid();
    this.authService.stateUser().subscribe(res => {
      if (res) {
        console.log('está loggeado');
      } else {
        console.log('no está loggeado');
      }
    });
  }

  /**
   * Método para obtener ID del usuario Loggeado
   */
  async getUid() {
    const uid = await this.authService.getUid();
    if (uid) {
      this.uid = uid;
      console.log('uid:', this.uid);
      this.getInfoUser();
    } else {
      console.log('no existe uid');
    }
  }

  /**
   * Método para obtener la información del usuario loggeado
   */
  getInfoUser() {
    console.log('start info user');
    const path = 'datas';
    const id = this.uid;
    this.firestoreService.getDoc<UserI>(path, id).subscribe(res => {
      if (res) {
        this.data = res;
        this.roles = res?.roles;
        console.log('roles', this.roles);
        console.log('info actualizado1:', res);
      }
    })
  }
}
