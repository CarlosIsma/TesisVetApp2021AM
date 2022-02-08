import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UbicacionVeterinariasPage } from './ubicacion-veterinarias.page';

const routes: Routes = [
  {
    path: '',
    component: UbicacionVeterinariasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UbicacionVeterinariasPageRoutingModule {}
