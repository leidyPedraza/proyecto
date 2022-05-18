import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserI } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private angularFirestore: AngularFirestore,
  ) { }

  /**
   * Método encargado de crear un registro de nuevo usuario
   * @param data 
   * @param path 
   * @param id 
   * @returns 
   */
  createDoc(data: any, path: string, id: string) {
    const collection = this.angularFirestore.collection(path);
    return collection.doc(id).set(data);
  }

  /**
   * Método para crear un ID de usuario
   * @returns string
   */
  getIdUser(): string {
    return this.angularFirestore.createId();
  }

  /**
   * 
   * @param path Método para obtener la colleción de usuarios
   * @returns array
   */
  getCollection<tipo>(path: string) {
    const collection = this.angularFirestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  /**
   * Método para obtener el perfil de un usuario
   * @param path 
   * @param id 
   * @returns Usuario
   */
  getDoc<tipo>(path: string, id: string) {
    return this.angularFirestore.collection(path).doc<tipo>(id).valueChanges();
  }

  /**
   * Método para actualizar la información del perfil de usurario
   * @param path 
   * @param id 
   * @param data 
   * @returns 
   */
  updateDoc(path: string, id: string, data: any) {
    return this.angularFirestore.collection(path).doc(id).update(data);
  }

  /**
  * Método para eliminar un perfil de usuario
  */
  deleteDoc(path: string, id: string) {
    return this.angularFirestore.collection(path).doc(id).delete();
  }
}
