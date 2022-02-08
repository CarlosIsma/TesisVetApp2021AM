import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioVeterinariaPageRoutingModule } from './formulario-veterinaria-routing.module';

import { FormularioVeterinariaPage } from './formulario-veterinaria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioVeterinariaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormularioVeterinariaPage]
})
export class FormularioVeterinariaPageModule {}
