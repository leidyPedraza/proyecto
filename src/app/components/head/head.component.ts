import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {}

  /**
   * Método para cerrar sesión
   */
  logOut() {
    if (localStorage.getItem('Logged') === "false") {
      confirm('no has iniciado sesión');
      localStorage.setItem('userInfo', '');
    } else {
      (confirm('desea cerra sesion?'));
      this.authService.out();
      localStorage.setItem('userInfo', '');
      localStorage.setItem('role', '')
      localStorage.setItem('Logged', "false");
      localStorage.setItem('uid', '');
      this.router.navigate(['/']);
    }
  }
}
