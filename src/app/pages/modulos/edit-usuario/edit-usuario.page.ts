import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { usuariosI } from 'src/app/interfaces/usuarios.interface';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.page.html',
  styleUrls: ['./edit-usuario.page.scss'],
})
export class EditUsuarioPage implements OnInit {
  editarUsuarioForm: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
  });

  usuarioActual: usuariosI;
  imagenSeleccionada: any;
  urlImagen: string;
  imagenChecked = false;
  errorIMG = false;
  url;
  idusuario: string;

  user;

  errorNombre: boolean = false;
  errorApellido: boolean = false;
  createMailUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private usuariosService: UsuariosService,
    private alertController: AlertController,
    public modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('User_Data'));

    this.datosUsuarioActual(this.user);
  }

  datosUsuarioActual(element: usuariosI) {
    this.idusuario = element.id;
    this.urlImagen = element.imagen;
    this.url = element.imagen; //Miniatura de la imagen guardada

    this.editarUsuarioForm.controls.nombre.setValue(element.nombre);
    this.editarUsuarioForm.controls.apellido.setValue(element.apellido);
  }

  comprobarCamposRequeridos() {
    if (this.editarUsuarioForm.controls.nombre.value === '') {
      this.errorNombre = true;
    } else if (this.editarUsuarioForm.controls.apellido.value === '') {
      this.errorApellido = true;
    } else {
      this.comprobarImagen();
    }
  }

  comprobarImagen() {
    if (this.imagenSeleccionada === undefined && this.imagenChecked === true) {
      this.errorIMG = true;
    } else {
      if (this.imagenChecked) {
        this.eliminarimagen(this.idusuario);
        this.guardarImagen(this.idusuario, this.imagenSeleccionada);
      } else {
        this.actualizarUsuario();
      }
    }
  }

  //MÉTODOS DE EDICIÓN IMAGEN

  eliminarimagen(idusuario) {
    this.usuariosService
      .eliminarimagenusuario(idusuario)
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

  guardarImagen(idusuario, image) {
    let filePath = 'usuarios-movil/' + idusuario;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, image);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.urlImagen = url;

            this.actualizarUsuario();
          });
        })
      )
      .subscribe();
  }

  actualizarUsuario() {
    let usuarioUpdated: usuariosI = this.editarUsuarioForm.value;

    this.usuariosService
      .actualizarusuario(this.idusuario, usuarioUpdated, this.urlImagen)
      .then(async (res) => {
        this.user.nombre = usuarioUpdated.nombre;
        this.user.apellido = usuarioUpdated.apellido;
        this.user.imagen = this.urlImagen;

        localStorage.setItem('User_Data', JSON.stringify(this.user));

        const alert = await this.alertController.create({
          header: 'Enhorabuena!',
          message: 'Usuario actualizado exitosamente',
          buttons: ['Aceptar'],
        });

        await alert.present();

        await alert.onDidDismiss().then(() => {
          this.reset();
          this.router.navigateByUrl('/menu').then(() => {
            window.location.reload();
          });
        });
      })
      .catch(() => {
        this.mensajeAlerta(
          'Alerta',
          'Ocurrió un problema al registrar el usuario en la base de datos'
        );
      });
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

  checkImagen(event) {
    let checked = event.target.checked;

    if (checked) {
      this.imagenChecked = checked;
    } else {
      this.imagenChecked = checked;
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
    this.imagenSeleccionada = undefined;
    this.urlImagen = undefined;
    this.errorIMG = false;
    this.url = undefined;

    this.editarUsuarioForm.reset();
  }

  ngOnDestroy() {
    localStorage.removeItem('veterinariaActual');
  }
}
