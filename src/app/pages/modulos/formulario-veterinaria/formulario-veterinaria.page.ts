import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { veterinariaI } from 'src/app/interfaces/veterinaria.interface';
import { VeterinariasService } from 'src/app/servicios/veterinarias.service';
import { ModalController } from '@ionic/angular';
import { GmapPage } from '../gmap/gmap.page';

@Component({
  selector: 'app-formulario-veterinaria',
  templateUrl: './formulario-veterinaria.page.html',
  styleUrls: ['./formulario-veterinaria.page.scss'],
})
export class FormularioVeterinariaPage implements OnInit {
  nuevaVeterinariaForm: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
    direccion: ['', [Validators.required,Validators.pattern('^[a-zA-Z 0-9]*$')]],
    referencia: ['',[Validators.pattern('^[a-zA-Z 0-9]*$')]],
    telefono: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
    sector: ['', [Validators.required]],
    formaPago: ['', [Validators.required]],
    servicios: ['', [Validators.required,Validators.pattern('^[a-zA-Z 0-9]*$')]],
    horaApertura: ['', [Validators.required]],
    horaCierre: ['', [Validators.required]],
    latitud: ['', [Validators.required]],
    longitud: ['', [Validators.required]],
  });

  coordsActivas = false;

  imagenSeleccionada: any;
  urlImagen: string;
  errorIMG = false;
  errorPDF = false;
  pdfSeleccionado: any;
  urlPDF: string;
  url;

  user;

  errorNombre: boolean = false;
  errordireccion: boolean = false;
  errorSector: boolean = false;
  errorTelefono: boolean = false;
  errorFormaPago: boolean = false;
  errorServicios: boolean = false;
  errorHoraApertura: boolean = false;
  errorHoraCierre: boolean = false;
  errorLatitud: boolean = false;
  errorLongitud: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private veterinariasService: VeterinariasService,
    private alertController: AlertController,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('User_Data'));
  }

  comprobarCamposRequeridos() {
    if (this.nuevaVeterinariaForm.controls.nombre.value === '') {
      this.errorNombre = true;
    } else if (this.nuevaVeterinariaForm.controls.direccion.value === '') {
      this.errordireccion = true;
    } else if (this.nuevaVeterinariaForm.controls.telefono.value === '') {
      this.errorTelefono = true;
    }else if (this.nuevaVeterinariaForm.controls.sector.value === '') {
      this.errorSector = true;
    } else if (this.nuevaVeterinariaForm.controls.formaPago.value === '') {
      this.errorFormaPago = true;
    } else if (this.nuevaVeterinariaForm.controls.servicios.value === '') {
      this.errorServicios = true;
    } else if (this.nuevaVeterinariaForm.controls.horaApertura.value === '') {
      this.errorHoraApertura = true;
    } else if (this.nuevaVeterinariaForm.controls.horaCierre.value === '') {
      this.errorHoraCierre = true;
    } else if (this.nuevaVeterinariaForm.controls.latitud.value === '') {
      this.errorLatitud = true;
    } else if (this.nuevaVeterinariaForm.controls.longitud.value === '') {
      this.errorLongitud = true;
    } else {
      this.comprobarHorarioVeterinaria();
    }
  }

  comprobarHorarioVeterinaria() {
    if (
      this.nuevaVeterinariaForm.value.horaApertura >=
      this.nuevaVeterinariaForm.value.horaCierre
    ) {
      this.mensajeAlerta(
        'Alerta',
        'El horario de apertura no puede ser mayor o igual al horario de cierre'
      );
    } else {
      this.comprobarImagenYPDF();
    }
  }

  comprobarImagenYPDF() {
    if (this.imagenSeleccionada !== undefined) {
      if (this.pdfSeleccionado !== undefined) {
        let idVeterinaria = this.db.createId();
        this.guardarImagen(idVeterinaria, this.imagenSeleccionada);
      } else {
        this.errorPDF = true;
      }
    } else {
      this.errorIMG = true;
    }
  }

  guardarImagen(idVeterinaria, image) {
    let filePath = 'veterinarias/' + 'IMG-' + idVeterinaria;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, image);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.urlImagen = url;
            this.guardarPDF(idVeterinaria, this.pdfSeleccionado);
          });
        })
      )
      .subscribe();
  }

  guardarPDF(idVeterinaria, pdf) {
    let filePath = 'veterinarias/' + 'PDF-' + idVeterinaria;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, pdf);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.urlPDF = url;
            this.crearVeterinaria(idVeterinaria);
          });
        })
      )
      .subscribe();
  }

  crearVeterinaria(idVeterinaria: string) {
    let nuevaVet: veterinariaI = this.nuevaVeterinariaForm.value;

    this.veterinariasService
      .registrarVeterinaria(
        idVeterinaria,
        nuevaVet,
        this.urlImagen,
        this.urlPDF,
        this.user.id,
        this.user.cedula
      )
      .then(() => {
        this.mensajeAlerta(
          'Enhorabuena!',
          'Veterinaria registrada exitosamente'
        );
        this.reset();
      })
      .catch(() => {
        this.mensajeAlerta(
          'Alerta',
          'Ocurrió un problema al registrar la veterinaria en la base de datos'
        );
      });
  }

  async getCoordenadas() {
    if (this.coordsActivas) {
      const modal = await this.modalController.create({
        component: GmapPage,
        componentProps: {
          data: {
            dest_lat: this.nuevaVeterinariaForm.controls.latitud.value,
            dest_lng: this.nuevaVeterinariaForm.controls.longitud.value,
            direccion: '',
            editar: true,
          },
        },
      });

      await modal.present();

      const datosModal = await modal.onWillDismiss();

      if (datosModal.data.recibir) {
        this.nuevaVeterinariaForm.controls.latitud.setValue(
          datosModal.data.dest_lat
        );
        this.nuevaVeterinariaForm.controls.longitud.setValue(
          datosModal.data.dest_lng
        );
        this.coordsActivas = true;
      }
    } else {
      const modal = await this.modalController.create({
        component: GmapPage,
        componentProps: {
          data: {
            dest_lat: 0,
            dest_lng: 0,
            direccion: '',
            editar: false,
          },
        },
      });

      await modal.present();

      const datosModal = await modal.onWillDismiss();

      if (datosModal.data.recibir) {
        this.nuevaVeterinariaForm.controls.latitud.setValue(
          datosModal.data.dest_lat
        );
        this.nuevaVeterinariaForm.controls.longitud.setValue(
          datosModal.data.dest_lng
        );
        this.coordsActivas = true;
      }
    }
  }

  showPreview(event: any) {
    this.imagenSeleccionada = event.target.files[0];
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.url = reader.result;
      };
    }
  }

  seleccionarPDf(event: any) {
    this.pdfSeleccionado = event.target.files[0];
  }

  async mensajeAlerta(header, message) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  reset() {
    this.coordsActivas = false;
    this.imagenSeleccionada = undefined;
    this.urlImagen = undefined;
    this.errorIMG = false;
    this.errorPDF = false;
    this.pdfSeleccionado = undefined;
    this.urlPDF = undefined;
    this.url = undefined;

    this.nuevaVeterinariaForm.reset();
  }
}
