import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesVeterinariasPageRoutingModule } from './detalles-veterinarias-routing.module';

import { DetallesVeterinariasPage } from './detalles-veterinarias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesVeterinariasPageRoutingModule
  ],
  declarations: [DetallesVeterinariasPage]
})
export class DetallesVeterinariasPageModule {}
