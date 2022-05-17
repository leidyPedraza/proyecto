import { Component} from '@angular/core';
import { Router } from '@angular/router';
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
  roles: 'usuario'|'admin' | undefined = null as any;
  data: UserI = {
    name:null as any,
    age:null as any,
    email:null as any,
    uid: null as any,
    password:null as any,
    roles: null as any
  }
  

  constructor(
              private authService: AuthService,
              private firestoreService: FirestoreService,
              private router: Router
  ){
    this.getUid();
    this.authService.stateUser().subscribe(res =>{
      if(res){
        console.log('está loggeado');
      } else{
        console.log('no está loggeado');
      }
    });
  }
  logOut(){
    this.authService.out();
    this.router.navigate(['/']);
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
    console.log('start info user');
    const path = 'datas';
    const id = this.uid;
    this.firestoreService.getDoc<UserI>(path,id).subscribe(res =>{
      if(res){
        this.userInfo = res;
        console.log('res', res)
      }
      this.roles = res?.roles;
      console.log('roles',this.roles);
      console.log('info actualizado1:', res);
    })
  }
}
