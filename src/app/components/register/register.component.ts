import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
              private authService: AuthService,
              private router : Router
              ) { }

  Register() {
    console.log(this.user);
    const { email, password } = this.user;
    this.authService.registry(email, password).then(res => {
      this.router.navigate(['/bienvenido']);
      console.log('registro exitoso',res);
    })
  }
  logger(){
    console.log(this.user);
    const {email, password}= this.user;
    this.authService.login(email,password).then(res =>{
      this.router.navigate(['/bienvenido']);
      console.log('Usuario loggeado', res);
    }
    )
  }
}