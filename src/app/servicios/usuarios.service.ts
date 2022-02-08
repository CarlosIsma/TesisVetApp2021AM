import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  QuerySnapshot,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, take } from 'rxjs/operators';
import { usuariosI } from '../interfaces/usuarios.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  public user: usuariosI;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth
  ) {}

  getUserCorreo(correo: string) {
    let usuariosCollectionRef = this.db.collection<usuariosI>(
      'usuarios-movil',
      (ref) => ref.where('correo', '==', correo)
    );

    const usuario = usuariosCollectionRef
      .get()
      .pipe(
        map(
          (res: QuerySnapshot<usuariosI>) => res.docs.map((d) => d.data()),
          take(1)
        )
      );

    return usuario;
  }
  registrarusuario(idusuario: string, data, urlImagen: string) {
    let nuevoUsuario = {
      id: idusuario,
      cedula: data.cedula,
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.correo,
      rol: data.rol,
      aprobado: true,
      imagen: urlImagen,
    };

    return this.db.doc(`usuarios-movil/` + idusuario).set(nuevoUsuario);
  }

  actualizarusuario(idusuario, data, urlImagen) {
    return this.db.doc(`usuarios-movil/` + idusuario).update({
      nombre: data.nombre,
      apellido: data.apellido,
      imagen: urlImagen,
    });
  }

  actualizarusuarioEstado(idusuario) {
    return this.db.doc(`usuarios-movil/` + idusuario).update({
      aprobado: true,
    });
  }

  crearAuth(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  eliminarimagenusuario(idusuario) {
    let filePath = 'usuarios-movil/' + idusuario;
    const fileRef = this.storage.ref(filePath);

    return fileRef.delete();
  }
}
