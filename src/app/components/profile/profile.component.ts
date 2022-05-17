import { Component, OnInit } from '@angular/core';
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
  roles: 'usuario' | 'admin' = null as any;
    constructor(
              private authService: AuthService,
              private firestoreService: FirestoreService
  ) { }

  async ngOnInit() {
    console.log('esta en perfil');
    this.getUid();
    this.authService.stateUser().subscribe(res =>{
      console.log('estado de autenticacion;', res);
    })
  }
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
  getInfoUser(){
    const path = 'datas';
    const id = this.uid;
    this.firestoreService.getDoc<UserI>(path,id).subscribe(res =>{
      if(res){
        this.userInfo = res;
      }
      console.log('info:', res);
    })
  }
}
