import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { GmapsService } from 'src/app/servicios/gmaps.service';

declare let google;

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.page.html',
  styleUrls: ['./gmap.page.scss'],
})
export class GmapPage implements OnInit {
  @Input() data: any;
  geocoder = new google.maps.Geocoder();
  googleAutocomplete = new google.maps.places.AutocompleteService();
  map;
  direccion = '';
  searchResults = [];
  coordinates = new google.maps.LatLng(0.3500804, -78.1295547);
  marker = new google.maps.Marker({
    position: this.coordinates,
    map: null,
    draggable: true,
  });
  clientCoords;
  editar = false;

  constructor(
    public gmapsSrv: GmapsService,
    public modal: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.gmapsSrv.cargarMapa();
    this.nuevoOEditar(this.data);
  }

  nuevoOEditar(data) {
    this.editar = data.editar;

    if (this.editar) {
      let coords = {
        lat: data.dest_lat,
        lng: data.dest_lng,
      };

      this.setEditMarker(coords);
    }
  }

  searchChanged(sitio: string) {
    if (sitio.trim().length) {
      let search = sitio;
      return this.googleAutocomplete.getPlacePredictions(
        { input: 'Ecuador, ' + search },
        (predictions) => {
          this.searchResults = predictions;
        }
      );
    }
  }

  getCoords(e: any) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: e.target.value }, (results) => {
      let coords = results[0].geometry.location;
      this.gmapsSrv.map.setCenter(coords);
      this.setMarker();
    });
  }

  setMarker() {
    if (this.marker.map !== null) {
      this.marker.setMap(null);
    }
    this.marker.setPosition(this.gmapsSrv.map.getCenter());
    this.marker.setMap(this.gmapsSrv.map);
    this.onGetDirection(this.marker.position);
    this.clientCoords = this.gmapsSrv.map.getCenter();
    this.data.dest_lat = this.clientCoords.lat();
    this.data.dest_lng = this.clientCoords.lng();
    google.maps.event.addListener(this.marker, 'dragstart', () => {});
    google.maps.event.addListener(this.marker, 'dragend', () => {
      this.clientCoords = this.marker.position;
      this.data.dest_lat = this.clientCoords.lat();
      this.data.dest_lng = this.clientCoords.lng();
      this.onGetDirection(this.marker.position);
    });
  }

  setEditMarker(coords) {
    this.gmapsSrv.map.setCenter(coords);

    if (this.marker.map !== null) {
      this.marker.setMap(null);
    }

    this.marker.setPosition(this.gmapsSrv.map.getCenter());
    this.marker.setMap(this.gmapsSrv.map);
    this.onGetDirection(this.marker.position);
    this.clientCoords = this.gmapsSrv.map.getCenter();
    this.data.dest_lat = this.clientCoords.lat();
    this.data.dest_lng = this.clientCoords.lng();
    google.maps.event.addListener(this.marker, 'dragstart', () => {});
    google.maps.event.addListener(this.marker, 'dragend', () => {
      this.clientCoords = this.marker.position;
      this.data.dest_lat = this.clientCoords.lat();
      this.data.dest_lng = this.clientCoords.lng();
      this.onGetDirection(this.marker.position);
    });
  }

  async onGetDirection(latLng) {
    await this.geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          const ubica = results[0].formatted_address;
          const ubicaStr = ubica.split(',', 2);
          this.direccion = ubicaStr;
          this.data.direccion = this.direccion;
        }
      }
    });
  }

  enviarDireccion(): void {
    if (
      this.data.dest_lat !== 0 &&
      this.data.dest_lng !== 0 &&
      this.data.direccion !== ''
    ) {
      this.data.recibir = true;
      this.modal.dismiss(this.data);
    } else {
      this.mensajeAlerta('Alerta', ' No se pudo obtener ninguna ubicación');
    }
  }

  cancelar(): void {
    this.modal.dismiss({
      recibir: false,
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
