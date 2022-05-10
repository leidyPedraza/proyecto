import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  constructor(
              private authService: AuthService,
              private router: Router
  ){}
  logOut(){
    this.authService.out();
    return this.router.navigate(['/'])
  }
}
