import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { BeginComponent } from './components/begin/begin.component';
import { EditComponent } from './components/edit/edit.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './guard/auth.guard';
import { map } from 'rxjs/operators'
import { canActivate} from '@angular/fire/auth-guard'


const rolAdmin = 'SGtWIZxE4KOMqXpRJgCHSItLbyK2';
const onlyAdmin= () => map((user:any) => !!user && user.uid === rolAdmin )

const routes: Routes = [
  {path: '', component: BeginComponent },
  {path: 'registro', component: RegisterComponent},
  {path: 'bienvenido', canActivate: [AuthGuard], component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'perfil', component: ProfileComponent},
  {path: 'editar/:id', component:EditComponent},
  {path: 'admin', component: AdminComponent, ...canActivate(onlyAdmin), canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
