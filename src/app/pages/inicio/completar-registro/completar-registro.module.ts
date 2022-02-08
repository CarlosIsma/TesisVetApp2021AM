import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompletarRegistroPageRoutingModule } from './completar-registro-routing.module';

import { CompletarRegistroPage } from './completar-registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompletarRegistroPageRoutingModule
  ],
  declarations: [CompletarRegistroPage]
})
export class CompletarRegistroPageModule {}
