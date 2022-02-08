import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-completar-registro',
  templateUrl: './completar-registro.page.html',
  styleUrls: ['./completar-registro.page.scss'],
})
export class CompletarRegistroPage implements OnInit {
  constructor(
    private usuariosservice: UsuariosService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  comprobarPass(form) {
    if (form.value.password === form.value.confirmPass) {
      this.comprobarTamanoPass(form);
    } else {
      this.mensajeAlerta('Alerta', 'Las contraseñas no coinciden');
    }
  }

  comprobarTamanoPass(form) {
    if (form.value.password.length >= 6) {
      this.completarRegistro(form);
    } else {
      this.mensajeAlerta(
        'Alerta',
        'La contraseña debe tener al menos 6 caractéres'
      );
    }
  }

  completarRegistro(form) {
    this.usuariosservice.getUserCorreo(form.value.correo).subscribe((res) => {
      if (res.length !== 0) {
        this.usuariosservice
          .crearAuth(form.value.correo, form.value.password)
          .then(() => {
            this.usuariosservice
              .actualizarusuarioEstado(res[0].id)
              .then(() => {
                this.mensajeAlerta(
                  'Enhorabuena',
                  'Se ha completado el registro del usuario'
                );

                form.reset();
              })
              .catch(() => {
                this.mensajeAlerta('Alerta', 'Error al actualizar el usuario');
              });
          })
          .catch(() => {
            this.mensajeAlerta(
              'Alerta',
              'Error al crear las credenciales de acceso del usuario'
            );
          });
      } else {
        this.mensajeAlerta(
          'Alerta',
          'No existe un usuario registrado con las credenciales ingresadas'
        );
      }
    });
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
