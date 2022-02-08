import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VeterinariasListaPageRoutingModule } from './veterinarias-lista-routing.module';

import { VeterinariasListaPage } from './veterinarias-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VeterinariasListaPageRoutingModule
  ],
  declarations: [VeterinariasListaPage]
})
export class VeterinariasListaPageModule {}
