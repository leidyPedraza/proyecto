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
  userInfo: UserI = null as any;
  uid: string = JSON.stringify(localStorage.getItem('uid'));

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
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getUserInfo();
    this.getId();
  }

  /**
   * Método para obtener la información del usuario loggeado
   */
  getUserInfo() {
    this.data = JSON.parse(localStorage.getItem('userInfo') || '[]');
    console.log('data', this.data);
  }

  /**
   * Método para obtener el ID del usuario loggeado
   */
  async getUid() {
    const id = await this.authService.getUid();
    if (id) {
      this.uid = id;
      localStorage.setItem('uid', id);
    }
  }

  /**
   * Método para obtener el ID traido en la URL
   */
  getId() {
    const id = this.activatedRoute.snapshot.paramMap.get('uid');
    this.uid = id ? id : '';
    console.log('uid', id);
  }
}
