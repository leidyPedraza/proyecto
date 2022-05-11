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
  user= {
    email: '',
    password: '',
  }
  constructor(
    private authService: AuthService,
    private router: Router) { }

  async logger() {
    console.log(this.user);
    const res = await this.authService.login(this.user.email, this.user.password)
    .catch(error =>{
      console.log('error', error);
    })
    if(res){
      console.log('respuesta',res);
      this.router.navigate(['/bienvenido']);
    }
  }
}

