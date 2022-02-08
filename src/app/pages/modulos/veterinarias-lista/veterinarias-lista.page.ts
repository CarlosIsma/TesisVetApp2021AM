import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSelect } from '@ionic/angular';
import { veterinariaI } from 'src/app/interfaces/veterinaria.interface';
import { VeterinariasService } from 'src/app/servicios/veterinarias.service';

@Component({
  selector: 'app-veterinarias-lista',
  templateUrl: './veterinarias-lista.page.html',
  styleUrls: ['./veterinarias-lista.page.scss'],
})
export class VeterinariasListaPage implements OnInit {
  veterinarias: veterinariaI[] = [];
  mostrarLimpiarFiltro = false;
  user;
  ocultarFiltro = false;

  @ViewChild('filtroSelect', { static: false }) filtroSelect: IonSelect;

  constructor(private veterinariasservicio: VeterinariasService) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('User_Data'));
    this.getAllVeterinarias();
  }

  getAllVeterinarias() {
    this.veterinarias = [];
    this.veterinariasservicio
      .getAllVeterinarias<veterinariaI>()
      .subscribe((res) => {
        this.veterinarias = res;
      });

    if (this.user.rol === 'invitado') {
      this.ocultarFiltro = true;
    } else {
      this.ocultarFiltro = false;
    }
  }

  getVeterinariasBySector(event) {
    if (event.target.value !== '') {
      this.veterinariasservicio
        .getVeterinariasBySector<veterinariaI>(event.target.value)
        .subscribe((res) => {
          this.veterinarias = res;
        });

      this.mostrarLimpiarFiltro = true;
    }
  }

  limpiarFiltro() {
    this.filtroSelect.value = '';
    this.mostrarLimpiarFiltro = false;
    this.getAllVeterinarias();
  }
}
