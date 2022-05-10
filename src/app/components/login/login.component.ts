import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  }
  constructor(
    private authService: AuthService,
    private router: Router) { }
  logger() {
    console.log(this.user);
    const { email, password } = this.user;
    this.authService.login(email, password).then(res => {
      this.router.navigate(['/bienvenido']);
      console.log('Usuario loggeado', res);
    }
    )
  }
  // isLogin() {
  //   return this.authService.getUserLogged().subscribe(res => {
  //     console.log('res',res?.email);
  //     return res?.email;
      
  //   })
  // }
}

