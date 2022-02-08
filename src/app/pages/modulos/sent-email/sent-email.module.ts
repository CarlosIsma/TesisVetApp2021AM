import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SentEmailPageRoutingModule } from './sent-email-routing.module';

import { SentEmailPage } from './sent-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SentEmailPageRoutingModule
  ],
  declarations: [SentEmailPage]
})
export class SentEmailPageModule {}
