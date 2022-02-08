import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UbicacionVeterinariasPageRoutingModule } from './ubicacion-veterinarias-routing.module';

import { UbicacionVeterinariasPage } from './ubicacion-veterinarias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UbicacionVeterinariasPageRoutingModule
  ],
  declarations: [UbicacionVeterinariasPage]
})
export class UbicacionVeterinariasPageModule {}
