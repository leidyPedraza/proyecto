import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/model/model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  uid: string = JSON.stringify(localStorage.getItem('uid'));
  userInfo: UserI = null as any;

  data: UserI = {
    name: null as any,
    age: null as any,
    email: null as any,
    uid: null as any,
    password: null as any,
    roles: null as any
  }
  role = localStorage.getItem('role');

  constructor(
  ) {}
  
  ngOnInit() {
    console.log('rol',this.role);
    setTimeout(() => {
      this.getUserInfo();
    }, 2000);
  }

  /**
   * Método para obtener la información del usuario Loggeado
   */
  getUserInfo() {
    this.data = JSON.parse(localStorage.getItem('userInfo') || '[]');
    const rol = this.data.roles;
    console.log('this role', rol)
    this.role = rol;
    localStorage.setItem('role', rol);
    console.log('data', this.data);
  }
}
