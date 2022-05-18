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

  ngOnInit(): void {
    this.router.navigate(['/login']);
    this.router.navigate(['/registro']);
    this.router.navigate(['/bienvenido']);
    this.router.navigate(['/perfil']);
    this.router.navigate(['/editar/:id']);
  }

  /**
   * Método para cerrar sesión
   */
  logOut() {
    if (confirm('desea cerra sesion?')) {
      this.authService.out();
      this.router.navigate(['/']);
    }
  }
}
