import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserI } from 'src/app/model/model';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {


  userInfo: UserI = null as any;
  uid: string = null as any;


  data: UserI = {
    name: null as any,
    age: null as any,
    email: null as any,
    uid: null as any,
    password: null as any,
    roles: null as any
  }
  roles: 'usuario' | 'admin' | undefined = null as any;



  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit() {

    this.getId();
    this.getInfoUser();
  }


  async save() {
    const uid = await this.authService.getUid();
    if (uid) {
      this.uid = uid;
      console.log('uid:', this.uid);
      this.updateInfo();
      console.log(this.data.uid);
      this.router.navigate(['/perfil']);
    } else {
      console.log('no existe uid');
    }
  }

  updateInfo() {
    const path = 'datas';
    const id = this.uid;
    const data = {
      name: this.data.name,
      age: this.data.age,
      email: this.data.email,
      roles: this.data.roles,
      uid: this.uid,
    }
    this.firestoreService.updateDoc(path, id, data);
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

  getInfoUser() {
    console.log('start info user');
    const path = 'datas';
    const id = this.uid;
    this.firestoreService.getDoc<UserI>(path, id).subscribe(res => {
      if (res) {
        this.userInfo = res;
        console.log('res', res)
      }
      this.roles = res?.roles;
      console.log('roles', this.roles);
      console.log('info actualizado1:', res);
      this.data.name = res?.name ? res.name : '';
      this.data.age = res?.age ? res.age : 0;
      this.data.email = res?.email ? res.email : '';
      this.data.roles = res?.roles ? res.roles : 'usuario';
    })
  }

  getId() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.uid = id ? id : '';
    console.log('uid', id);
  }

  delete() {
    const path = 'datas';
    const id = this.uid;
    if (confirm('seguro que desea eliminar cliente?')) {
      this.firestoreService.deleteDoc(path, id);
      this.router.navigate(['/admin']);
    }
  }
}
