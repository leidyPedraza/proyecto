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

  data: UserI = {
    name: null as any,
    age: null as any,
    email: null as any,
    uid: null as any,
    password: null as any,
    roles: null as any
  }
  roles: 'usuario' | 'admin' | undefined = null as any;
  uid: string = '';
  userUidLogged: string = '';

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit() {
    this.getUserUidLogged();
    this.getInfoUser();
  }

  /**
   * Método para guardar los cambios en el perfil del usuario
   */
  async save() {
    const uid = await this.activatedRoute.snapshot.paramMap.get('uid');
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

  /**
   * Método para actualizar la informacion del perfil del usuario
   */
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

  /**
   * Método para obtener el ID del usuario que está loggeado
   */
  private async getUserUidLogged() {
    const uid = await this.authService.getUid();
    if (uid) {
      this.userUidLogged = uid;
      this.getInfoUserLogged();
      console.log('userUidLogged:', this.userUidLogged);
      this.getInfoUser();
    } else {
      console.log('no existe userUidLogged');
    }
  }

  /**
   * Método para obtener el rol del usuario loggeado
   */
  private getInfoUserLogged() {
    console.log('start info user');
    const path = 'datas';
    const id = this.userUidLogged;
    this.firestoreService.getDoc<UserI>(path, id).subscribe(res => {
      if (res) {
        this.roles = res?.roles;
        console.log('roles', this.roles);
      }
    })
  }

  /**
   * Método para obtener el información del usuario a editar
   */
  async getInfoUser() {
    console.log('start info user');
    const uid = await this.activatedRoute.snapshot.paramMap.get('uid');
    if (uid) {
      this.uid = uid;
      const path = 'datas';
      this.firestoreService.getDoc<UserI>(path, uid).subscribe(res => {
        if (res) {
          console.log('res', res);
          this.data = res;
        }
      });
    }
  }

  /**
   * Método para eliminar el perfil de un usuario
   */
  delete() {
    const path = 'datas';
    const id = this.uid;
    if (confirm('seguro que desea eliminar cliente?')) {
      this.firestoreService.deleteDoc(path, id);
      this.router.navigate(['/admin']);
    }
  }
}
