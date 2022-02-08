import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonSlides } from '@ionic/angular';
import { ubicacionVeterinariasI } from 'src/app/interfaces/veterinaria.interface';
import { VeterinariasService } from 'src/app/servicios/veterinarias.service';

declare var google;

@Component({
  selector: 'app-ubicacion-veterinarias',
  templateUrl: './ubicacion-veterinarias.page.html',
  styleUrls: ['./ubicacion-veterinarias.page.scss'],
})
export class UbicacionVeterinariasPage implements OnInit {
  map = null;
  infoWindow = null;
  markers: ubicacionVeterinariasI[] = [];
  markerActual = {};
  veterinariaID;
  elementoButtton: HTMLElement;
  user;

  @ViewChild(IonSlides) slides: IonSlides;

  constructor(
    public veterinariasservicio: VeterinariasService,
    private route: ActivatedRoute,
    public routerNavigate: Router,
    private alertController: AlertController
  ) {}
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('User_Data'));
    const veterinariaID: string = this.route.snapshot.paramMap.get('id');
    this.veterinariaID = veterinariaID;
  }

  ngAfterViewInit(): void {
    this.veterinariasservicio.getAllVeterinarias().subscribe((res) => {
      for (let veterinariaUbi of res as ubicacionVeterinariasI[]) {
        let nuevaVeterinaria = {
          id: veterinariaUbi.id,
          imagen: veterinariaUbi.imagen,
          nombre: veterinariaUbi.nombre,
          position: {
            lat: veterinariaUbi.position[0],
            lng: veterinariaUbi.position[1],
          },
        };

        this.markers.push(nuevaVeterinaria);
      }

      this.loadMap();
    });
  }

  loadMap() {
    const mapEle: HTMLElement = document.getElementById('map');
    const myLatLng = { lat: -0.1859072, lng: -78.4422243 };

    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 11,
      zoomControl: false,
      streetViewControl: false,
    });

    this.renderMarkers();
  }

  getElementoButton() {
    return this.elementoButtton;
  }

  setElementoButton(elemento: HTMLElement) {
    this.elementoButtton = elemento;
    return this.elementoButtton;
  }

  renderMarkers() {
    for (const marcador of this.markers) {
      let infowindow = new google.maps.InfoWindow();
      let route = this.routerNavigate;
      let usuario = this.user;

      let marker = new google.maps.Marker({
        position: marcador.position,
        map: this.map,
      });

      google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(
          '<div style="color: red; text-align: center" id="' +
            marcador.id +
            '">' +
            '<ion-row>' +
            '<ion-col style="text-align: center">' +
            '<p style="font-size: 1rem">' +
            marcador.nombre +
            '</p>' +
            '</ion-col>' +
            '</ion-row>' +
            '<ion-row>' +
            '<ion-col style="text-align: center">' +
            '<img src="' +
            marcador.imagen +
            '" width="50rem" height="50rem" [routerLink]="["/menu"]">' +
            '</ion-col>' +
            '</ion-row>' +
            '<ion-row>' +
            '<ion-col style="text-align: center">' +
            '<ion-button id="' +
            marcador.id +
            '">Ver mas</ion-button>' +
            '</ion-col>' +
            '</ion-row>' +
            '</div>'
        );
        infowindow.open(this.map, this);
      });

      google.maps.event.addListener(infowindow, 'domready', () => {
        document.getElementById(marcador.id).addEventListener('click', () => {
          if (usuario.rol === 'invitado') {
            this.mensajeAlerta(
              'Ooops!',
              'No tiene acceso a este servicio. Para visualizar los detalles de la veterinaria inicie sesion con sus credenciales de usuario o registrese en la aplicación.'
            );
          } else {
            route.navigate(['/detalles-veterinarias/' + marcador.id]);
          }
        });
      });
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
}
