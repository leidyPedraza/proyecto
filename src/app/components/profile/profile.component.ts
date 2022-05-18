import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserI } from 'src/app/model/model';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  uid: string = null as any;
  userInfo: UserI = null as any;

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getId();
    this.getUid();
    this.authService.stateUser().subscribe(res => {
      console.log('estado de autenticacion;', res);
    })
  }

  /**
   * Método para obtener el ID del usuario loggeado
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
   * Método para obtener la informacion del perfil del usuario loggeado
   */
  getInfoUser() {
    const path = 'datas';
    const id = this.uid;
    this.firestoreService.getDoc<UserI>(path, id).subscribe(res => {
      if (res) {
        this.userInfo = res;
      }
      console.log('info:', res);
    })
  }

  /**
   * Método para obtener el ID traido en la URL
   */
  getId() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.uid = id ? id : '';
    console.log('uid', id);
  }
}
