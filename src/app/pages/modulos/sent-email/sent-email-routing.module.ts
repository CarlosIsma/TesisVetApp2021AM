import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SentEmailPage } from './sent-email.page';

const routes: Routes = [
  {
    path: '',
    component: SentEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SentEmailPageRoutingModule {}
