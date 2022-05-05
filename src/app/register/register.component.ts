import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = {
    email:'',
    password: ''
  }
  

  constructor(
              private authService: AuthService
              ) { }

  ngOnInit(): void {
  }
  register(){
    console.log(this.user);
    const {email,password}= this.user;
    this.authService.registry(email,password).then(res=>{
      console.log('registro exitoso'+res);
    })
  }
}
