import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AlertController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { usuariosI } from 'src/app/interfaces/usuarios.interface';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {
  createMailUser(cedula: string, nombre: string, apellido: string, correo: string, rol: string) {
    throw new Error('Method not implemented.');
  }
  ShowPassword=false;
  passwordToggleIcon='eye';

  ShowPassword1=false;
  passwordToggleIcon1='eye';

  imagenSeleccionada;
  urlImagen: string = '';
  url = null;

  constructor(
    private db: AngularFirestore,
    private alertController: AlertController,
    private storage: AngularFireStorage,
    private usuariosservice: UsuariosService
  ) {}

  togglePassword():void{
    this.ShowPassword=!this.ShowPassword;

    if(this.passwordToggleIcon=='eye'){
      this.passwordToggleIcon="eye-off";
    }else{
      this.passwordToggleIcon='eye';
    }
  };

  togglePassword1():void{
    this.ShowPassword1=!this.ShowPassword1;

    if(this.passwordToggleIcon1=='eye'){
      this.passwordToggleIcon1="eye-off";
    }else{
      this.passwordToggleIcon1='eye';
    }
  };

  ngOnInit() {}

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

  comprobarPass(form) {
    if (form.value.password === form.value.confirmPass) {
      this.comprobarTamanoPass(form);
    } else {
      this.mensajeAlerta('Alerta', 'Las contraseñas no coinciden');
    }
  }

  comprobarTamanoPass(form) {
    if (form.value.password.length >= 6) {
      this.comprobarImagen(form);
    } else {
      this.mensajeAlerta(
        'Alerta',
        'La contraseña debe tener al menos 6 caracteres'
      );
    }
  }



  comprobarImagen(form) {
    if (this.imagenSeleccionada !== undefined) {
      let idusuario = this.db.createId();
      this.guardarImagen(idusuario, this.imagenSeleccionada, form);
    } else {
      this.mensajeAlerta('Alerta', 'Debe seleccionar una imagen');
    }
  }

  guardarImagen(idusuario, image, form) {
    let filePath = 'usuarios-movil/' + idusuario;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, image);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.urlImagen = url;
            this.crearVeterinaria(idusuario, form);
          });
        })
      )
      .subscribe();
  }

  crearVeterinaria(idusuario: string, form) {
    let nuevouser: usuariosI = form.value;

    this.usuariosservice
      .registrarusuario(idusuario, nuevouser, this.urlImagen)
      .then(async () => {
        await this.usuariosservice
          .crearAuth(nuevouser.correo, nuevouser.password)
          .then(async () => {
            this.mensajeAlerta(
              'Registro Exitoso',
              'Datos registrados correctamente'
            );
            this.reset(form);
          })
          .catch((err) => {
            this.mensajeAlerta(
              'Alerta',
              'Dirección de correo electrónica invalida'
            );
          });
      })
      .catch((err) => {
        this.mensajeAlerta(
          'Alerta',
          'Ocurrió un problema al registrar la veterinaria en la base de datos'
        );
      });
  }

  reset(form) {
    form.reset();
    this.imagenSeleccionada = undefined;
    this.urlImagen = '';
    this.url = null;
  }

  async mensajeAlerta(header, message) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}
