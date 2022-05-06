import { Component} from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  user = {
    email:'',
    password: ''
  }
  

  constructor(
              private authService: AuthService
              ) { }

  Register() {
    console.log(this.user);
    const { email, password } = this.user;
    this.authService.registry(email, password).then(res => {
      console.log('registro exitoso',res);
    })
  }
}