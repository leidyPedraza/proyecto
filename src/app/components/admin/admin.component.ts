import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserI } from 'src/app/model/model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  datas: UserI[] = [];

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit() {
    this.getCollectionUsers();
  }

  /**
   * Método para obtener la coleccion de usuarios y despleagrala en la tabla HTML
   */
  getCollectionUsers() {
    const path = 'datas';
    this.firestoreService.getCollection<UserI>(path).subscribe(res => {
      console.log('coleccion:', res);
      this.datas = res;
    })
  }
}






