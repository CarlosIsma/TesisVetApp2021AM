import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditVeterinariasPageRoutingModule } from './edit-veterinarias-routing.module';

import { EditVeterinariasPage } from './edit-veterinarias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditVeterinariasPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [EditVeterinariasPage],
})
export class EditVeterinariasPageModule {}
