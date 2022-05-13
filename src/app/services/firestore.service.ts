import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  
  constructor(
              private angularFirestore: AngularFirestore,
  ) { }

  createDoc(data:any, path: string, id: string){
    const collection = this.angularFirestore.collection(path);
    return collection.doc(id).set(data);
  }
  getIdUser(){
    return this.angularFirestore.createId();
  }

  getCollection<tipo>(path:string){
    const collection = this.angularFirestore.collection<tipo>(path);
    return collection.valueChanges();
  }
  getDoc<tipo>(path:string, id:string){
    return this.angularFirestore.collection(path).doc<tipo>(id).valueChanges();
  }
  updateDoc(path:string, id:string, data:any ){
   return this.angularFirestore.collection(path).doc(id).update(data);

  }

}
