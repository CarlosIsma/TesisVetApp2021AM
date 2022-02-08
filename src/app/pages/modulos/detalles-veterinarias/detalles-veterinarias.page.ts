import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { veterinariaI } from 'src/app/interfaces/veterinaria.interface';
import { VeterinariasService } from 'src/app/servicios/veterinarias.service';

@Component({
  selector: 'app-detalles-veterinarias',
  templateUrl: './detalles-veterinarias.page.html',
  styleUrls: ['./detalles-veterinarias.page.scss'],
})
export class DetallesVeterinariasPage implements OnInit {
  veterinariaID: string;
  veterinaria: veterinariaI[] = [];

  constructor(
    public route: ActivatedRoute,
    private veterinariasservicio: VeterinariasService
  ) {}

  ngOnInit() {
    this.veterinariaID = this.route.snapshot.paramMap.get('id');

    this.veterinariasservicio
      .getVeterinaria(this.veterinariaID)
      .subscribe((res) => {
        this.veterinaria = res;
      });
  }
}
