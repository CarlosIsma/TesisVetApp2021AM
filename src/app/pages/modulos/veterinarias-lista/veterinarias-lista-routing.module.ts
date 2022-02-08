import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VeterinariasListaPage } from './veterinarias-lista.page';

const routes: Routes = [
  {
    path: '',
    component: VeterinariasListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VeterinariasListaPageRoutingModule {}
