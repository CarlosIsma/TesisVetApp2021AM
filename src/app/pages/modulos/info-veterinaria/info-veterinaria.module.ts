import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoVeterinariaPageRoutingModule } from './info-veterinaria-routing.module';

import { InfoVeterinariaPage } from './info-veterinaria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoVeterinariaPageRoutingModule
  ],
  declarations: [InfoVeterinariaPage]
})
export class InfoVeterinariaPageModule {}
