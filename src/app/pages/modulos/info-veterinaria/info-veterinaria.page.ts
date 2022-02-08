import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { veterinariaI } from 'src/app/interfaces/veterinaria.interface';
import { VeterinariasService } from 'src/app/servicios/veterinarias.service';

@Component({
  selector: 'app-info-veterinaria',
  templateUrl: './info-veterinaria.page.html',
  styleUrls: ['./info-veterinaria.page.scss'],
})
export class InfoVeterinariaPage implements OnInit {
  user;
  veterinaria: veterinariaI[] = [];
  estadoAprobacion: string = '';

  constructor(
    private veterinariasservicio: VeterinariasService,
    private alertController: AlertController
  ) {}

  public ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('User_Data'));

    this.veterinariasservicio
      .getVeterinariaByUser(this.user.id)
      .subscribe((res) => {
        this.veterinaria = res;
        localStorage.setItem(
          'veterinariaActual',
          JSON.stringify(this.veterinaria)
        );
        if (this.veterinaria[0].aprobado) {
          this.estadoAprobacion = 'Aprobada';
        } else {
          this.estadoAprobacion = 'Rechazada';
        }
        if (this.veterinaria[0].mensajeAprobacionChecked) {
          this.mensajeAlerta(
            'Aviso!',
            'Su solicitud de afilicacion fue: ' +
              this.estadoAprobacion +
              ' ' +
              this.veterinaria[0].mensajeAprobacion,
            this.veterinaria[0].id
          );
        }
      });
  }

  async mensajeAlerta(header, message, idVeterianria) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar'],
    });

    await alert.present();

    await alert.onDidDismiss().then(() => {
      this.veterinariasservicio.aceptarMensaje(idVeterianria);
    });
  }
}
