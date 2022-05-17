import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserI } from 'src/app/model/model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  
  
  userInfo: UserI = null as any;
  uid: string = null as any;
  
 
  data: UserI = {
    name:null as any,
    age:null as any,
    email:null as any,
    uid: null as any,
    password:null as any,
    roles: null as any
  }
  roles: 'usuario'|'admin' | undefined = null as any;
  


  constructor(
              private firestoreService: FirestoreService,
              private authService : AuthService
  ) { }
  ngOnInit() {
    this.getUid();
  }

  
  async save() {
    const uid = await this.authService.getUid();
    if (uid) {
      this.uid = uid;
      console.log('uid:', this.uid);
      this.updateInfo();
      console.log(this.data.uid);
    } else {
      console.log('no existe uid');
    }
  }
 
  updateInfo(){
    const path = 'datas';
    const id = this.uid;
    const data = {
      name : this.data.name,
      age : this.data.age,
      email : this.data.email,
      roles: this.data.roles,
      uid : this.uid,
    }
    this.firestoreService.updateDoc(path,id, data);
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
