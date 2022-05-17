import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserI } from 'src/app/model/model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
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
              private authService : AuthService,
              private firestoreService : FirestoreService
  ) { }

  ngOnInit() {
    this.getCollectionUsers();
  }
  datas: UserI[]= [];


  getCollectionUsers(){
    const path = 'datas';
    this.firestoreService.getCollection<UserI>(path).subscribe(res =>{
      console.log('coleccion:', res);
      this.datas = res;
    })
  }
}

