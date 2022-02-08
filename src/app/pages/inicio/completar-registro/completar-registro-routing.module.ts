import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompletarRegistroPage } from './completar-registro.page';

const routes: Routes = [
  {
    path: '',
    component: CompletarRegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompletarRegistroPageRoutingModule {}
