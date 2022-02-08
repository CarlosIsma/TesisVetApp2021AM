import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { veterinariaI } from 'src/app/interfaces/veterinaria.interface';
import { VeterinariasService } from 'src/app/servicios/veterinarias.service';
import { GmapPage } from '../gmap/gmap.page';

@Component({
  selector: 'app-edit-veterinarias',
  templateUrl: './edit-veterinarias.page.html',
  styleUrls: ['./edit-veterinarias.page.scss'],
})
export class EditVeterinariasPage implements OnInit {
  crearVeterinaria(nombre: string) {
    throw new Error('Method not implemented.');
  }
  editarVeterinariaForm: FormGroup = this.formBuilder.group({
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

  veterinariaActual: veterinariaI;
  imagenSeleccionada: any;
  urlImagen: string;
  imagenChecked = false;
  pdfChecked = false;
  errorIMG = false;
  errorPDF = false;
  pdfSeleccionado: any;
  urlPDF: string;
  url;
  idveterinaria: string;

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
    private storage: AngularFireStorage,
    private veterinariasService: VeterinariasService,
    private alertController: AlertController,
    public modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('User_Data'));
    this.veterinariaActual = JSON.parse(
      localStorage.getItem('veterinariaActual')
    );

    this.datosVeterinariaActual(this.veterinariaActual);
  }

  datosVeterinariaActual(element: veterinariaI) {
    this.idveterinaria = element[0].id;
    this.urlImagen = element[0].imagen;
    this.urlPDF = element[0].pdfRUC;
    this.url = element[0].imagen; //Miniatura de la imagen guardada
    this.coordsActivas = true;

    this.editarVeterinariaForm.controls.nombre.setValue(element[0].nombre);
    this.editarVeterinariaForm.controls.direccion.setValue(
      element[0].direccion
    );
    this.editarVeterinariaForm.controls.referencia.setValue(
      element[0].referencia
    );
    this.editarVeterinariaForm.controls.telefono.setValue(
      element[0].telefono
    );
    this.editarVeterinariaForm.controls.sector.setValue(element[0].sector);
    this.editarVeterinariaForm.controls.formaPago.setValue(
      element[0].formaPago
    );
    this.editarVeterinariaForm.controls.servicios.setValue(
      element[0].servicios
    );
    this.editarVeterinariaForm.controls.horaApertura.setValue(
      element[0].horaApertura
    );
    this.editarVeterinariaForm.controls.horaCierre.setValue(
      element[0].horaCierre
    );
    this.editarVeterinariaForm.controls.latitud.setValue(
      element[0].position[0]
    );
    this.editarVeterinariaForm.controls.longitud.setValue(
      element[0].position[1]
    );
  }

  comprobarCamposRequeridos() {
    if (this.editarVeterinariaForm.controls.nombre.value === '') {
      this.errorNombre = true;
    } else if (this.editarVeterinariaForm.controls.direccion.value === '') {
      this.errordireccion = true;
    } else if (this.editarVeterinariaForm.controls.sector.value === '') {
      this.errorSector = true;
    } else if (this.editarVeterinariaForm.controls.telefono.value === '') {
      this.errorTelefono = true;
    } else if (this.editarVeterinariaForm.controls.formaPago.value === '') {
      this.errorFormaPago = true;
    } else if (this.editarVeterinariaForm.controls.servicios.value === '') {
      this.errorServicios = true;
    } else if (this.editarVeterinariaForm.controls.horaApertura.value === '') {
      this.errorHoraApertura = true;
    } else if (this.editarVeterinariaForm.controls.horaCierre.value === '') {
      this.errorHoraCierre = true;
    } else if (this.editarVeterinariaForm.controls.latitud.value === '') {
      this.errorLatitud = true;
    } else if (this.editarVeterinariaForm.controls.longitud.value === '') {
      this.errorLongitud = true;
    } else {
      this.comprobarHorarioVeterinaria();
    }
  }

  comprobarHorarioVeterinaria() {
    if (
      this.editarVeterinariaForm.value.horaApertura >=
      this.editarVeterinariaForm.value.horaCierre
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
    if (this.imagenSeleccionada === undefined && this.imagenChecked === true) {
      this.errorIMG = true;
    } else if (this.pdfSeleccionado === undefined && this.pdfChecked === true) {
      this.errorPDF = true;
    } else {
      if (this.imagenChecked) {
        this.eliminarimagen(this.idveterinaria);
        this.guardarImagen(this.idveterinaria, this.imagenSeleccionada);
      } else if (this.pdfChecked) {
        this.eliminarPDF(this.idveterinaria);
        this.guardarPDF(this.idveterinaria, this.pdfSeleccionado);
      } else {
        this.actualizarVeterinaria();
      }
    }
  }

  //MÉTODOS DE EDICIÓN IMAGEN

  eliminarimagen(idveterinaria) {
    this.veterinariasService
      .eliminarimagen(idveterinaria)
      .toPromise()
      .then((res) => {
        console.log('Imagen eliminada satisfactoriamente!');
        return;
      })
      .catch((err) => {
        this.mensajeAlerta(
          'Alerta',
          'Error al eliminar la imagen de la base de datos'
        );
      });
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

            if (this.pdfChecked) {
              this.eliminarPDF(this.idveterinaria);
              this.guardarPDF(this.idveterinaria, this.pdfSeleccionado);
            } else {
              this.actualizarVeterinaria();
            }
          });
        })
      )
      .subscribe();
  }

  //MÉTODOS DE EDICIÓN PDF

  eliminarPDF(idveterinaria) {
    this.veterinariasService
      .eliminarpdf(idveterinaria)
      .toPromise()
      .then((res) => {
        console.log('Archivo PDF eliminado satisfactoriamente!');
        return;
      })
      .catch((err) => {
        this.mensajeAlerta(
          'Alerta',
          'Error al eliminar el archivo PDF de la base de datos'
        );
      });
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
            this.actualizarVeterinaria();
          });
        })
      )
      .subscribe();
  }

  actualizarVeterinaria() {
    let veterinariaUpdated: veterinariaI = this.editarVeterinariaForm.value;

    this.veterinariasService
      .actualizarveterinaria(
        this.idveterinaria,
        veterinariaUpdated,
        this.urlImagen,
        this.urlPDF
      )
      .then(async (res) => {
        const alert = await this.alertController.create({
          header: 'Enhorabuena!',
          message: 'Veterinaria actualizada exitosamente',
          buttons: ['Aceptar'],
        });

        await alert.present();

        await alert.onDidDismiss().then(() => {
          this.reset();
          this.router.navigate(['/menu']);
        });
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
            dest_lat: this.editarVeterinariaForm.controls.latitud.value,
            dest_lng: this.editarVeterinariaForm.controls.longitud.value,
            direccion: '',
            editar: true,
          },
        },
      });

      await modal.present();

      const datosModal = await modal.onWillDismiss();

      if (datosModal.data.recibir) {
        this.editarVeterinariaForm.controls.latitud.setValue(
          datosModal.data.dest_lat
        );
        this.editarVeterinariaForm.controls.longitud.setValue(
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
        this.editarVeterinariaForm.controls.latitud.setValue(
          datosModal.data.dest_lat
        );
        this.editarVeterinariaForm.controls.longitud.setValue(
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

  checkImagen(event) {
    let checked = event.target.checked;

    if (checked) {
      this.imagenChecked = checked;
    } else {
      this.imagenChecked = checked;
    }
  }

  checkPDF(event) {
    let checked = event.target.checked;

    if (checked) {
      this.pdfChecked = true;
    } else {
      this.pdfChecked = false;
    }
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

    this.editarVeterinariaForm.reset();
  }

  ngOnDestroy() {
    localStorage.removeItem('veterinariaActual');
  }
}
