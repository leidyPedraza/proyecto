import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from '../../services/auth.service';
import { UserI } from 'src/app/model/model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  data: UserI = {
    name:null as any,
    age:null as any,
    email:null as any,
    uid:null as any,
    password:null as any,
    roles: 'usuario'
  }
  constructor(
              private authService: AuthService,
              private router : Router,
              private firestoreService: FirestoreService
              ) { }
  
  async Register(){
    console.log(this.data);
    const res = await this.authService.registry(this.data).catch(error => {
      console.log('error', error);
    })
    if (res){
      console.log('exito al crear usuario');
      const path = 'datas';
      const id = res.user!.uid;
      this.data.uid = id;
      this.data.password = '';
      await this.firestoreService.createDoc(this.data, path, id);
      this.router.navigate(['/bienvenido']);
    }
  }

  logger(): void{
    console.log(this.data);
    const {email, password}= this.data;
    this.authService.login(email,password).then(res =>{
      this.router.navigate(['/bienvenido']);
      console.log('Usuario loggeado', res);
    }
    )
  }
}
   