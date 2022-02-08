import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  QuerySnapshot,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, take } from 'rxjs/operators';
import { veterinariaI } from '../interfaces/veterinaria.interface';

@Injectable({
  providedIn: 'root',
})
export class VeterinariasService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  getAllVeterinarias<veterinariaI>() {
    let veterinariasCollectionRef = this.db.collection<veterinariaI>(
      'veterinarias',
      (ref) => ref.where('aprobado', '==', true)
    );

    const veterinarias = veterinariasCollectionRef.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    return veterinarias;
  }

  getVeterinariasBySector<veterinariaI>(sector: string) {
    let veterinariasCollectionRef = this.db.collection<veterinariaI>(
      'veterinarias',
      (ref) => ref.where('sector', '==', sector)
    );

    const veterinarias = veterinariasCollectionRef.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    return veterinarias;
  }

  getVeterinaria(veterinaria_id: string) {
    let veterinariasCollectionRef = this.db.collection<veterinariaI>(
      'veterinarias',
      (ref) => ref.where('id', '==', veterinaria_id)
    );

    let veterianria = veterinariasCollectionRef
      .get()
      .pipe(
        map(
          (res: QuerySnapshot<veterinariaI>) => res.docs.map((d) => d.data()),
          take(1)
        )
      );

    return veterianria;
  }

  getVeterinariaByUser(idUsuario: string) {
    let veterinariasCollectionRef = this.db.collection<veterinariaI>(
      'veterinarias',
      (ref) => ref.where('idUsuario', '==', idUsuario)
    );

    let veterianria = veterinariasCollectionRef
      .get()
      .pipe(
        map(
          (res: QuerySnapshot<veterinariaI>) => res.docs.map((d) => d.data()),
          take(1)
        )
      );

    return veterianria;
  }

  registrarVeterinaria(
    idVeterinaria: string,
    data,
    urlImagen: string,
    urlPDF: string,
    idUsuario,
    cedulaUsuario
  ) {
    let coordenadas = {
      0: Number(data.latitud),
      1: Number(data.longitud),
    };

    let nuevaVeterinaria = {
      id: idVeterinaria,
      nombre: data.nombre,
      direccion: data.direccion,
      referencia: data.referencia,
      telefono: data.telefono,
      sector: data.sector,
      formaPago: data.formaPago,
      servicios: data.servicios,
      horaApertura: data.horaApertura,
      horaCierre: data.horaCierre,
      imagen: urlImagen,
      pdfRUC: urlPDF,
      position: coordenadas,
      aprobado: false,
      idUsuario: idUsuario,
      cedulaUsuario: cedulaUsuario,
    };

    return this.db.doc(`veterinarias/` + idVeterinaria).set(nuevaVeterinaria);
  }

  actualizarveterinaria(idveterinaria, data, urlImagen, urlPDF) {
    let coordenadas = {
      0: Number(data.latitud),
      1: Number(data.longitud),
    };

    return this.db.doc(`veterinarias/` + idveterinaria).update({
      nombre: data.nombre,
      direccion: data.direccion,
      referencia: data.referencia,
      telefono: data.telefono,
      sector: data.sector,
      formaPago: data.formaPago,
      servicios: data.servicios,
      horaApertura: data.horaApertura,
      horaCierre: data.horaCierre,
      imagen: urlImagen,
      pdfRUC: urlPDF,
      position: coordenadas,
    });
  }

  aceptarMensaje(idVeterinaria) {
    return this.db.doc(`veterinarias/` + idVeterinaria).update({
      mensajeAprobacionChecked: false,
    });
  }

  eliminarimagen(idveterianria) {
    let filePath = 'veterinarias/' + 'IMG-' + idveterianria;
    const fileRef = this.storage.ref(filePath);

    return fileRef.delete();
  }

  eliminarpdf(idPDF) {
    let filePath = 'veterinarias/' + 'PDF-' + idPDF;
    const fileRef = this.storage.ref(filePath);

    return fileRef.delete();
  }
}
