import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserI } from 'src/app/model/model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  userInfo: UserI = null as any;
  uid: string = '';
 
  data: UserI = {
    name:null as any,
    age:null as any,
    email:null as any,
    uid: null as any,
    password:null as any,
    roles: 'usuario'
  }
  


  constructor(
              private firestoreService: FirestoreService,
              private authService : AuthService
  ) { }

  
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
      uid : this.uid,
    }
    this.firestoreService.updateDoc(path,id, data);
  }

}