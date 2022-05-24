
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  /**
   * Guardian para proteger el acceso a rutas de usuarios NO loggeados
   * @returns boolean
   */
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.getUserLogged() && localStorage.getItem('Logged') == "false") {
      localStorage.setItem('Logged', JSON.stringify(false));
      console.log('usuario',)
      console.log('no entro');
      return this.router.navigate(['/login']).then(() => false);
    }
    localStorage.setItem('Logged', JSON.stringify(true));
    return true;
  }
}

