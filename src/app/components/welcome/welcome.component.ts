import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  /* roles: 'usuario'| 'admin' = "'usuario'"; */
  constructor(
              private authService: AuthService,
              private router: Router
  ){
    this.authService.stateUser().subscribe(res =>{
      if(res){
        console.log('está loggeado');
      } else{
        console.log('no está loggeado');
      }
    });
  }
  logOut(){
    this.authService.out();
    this.router.navigate(['/']);
  }
}
