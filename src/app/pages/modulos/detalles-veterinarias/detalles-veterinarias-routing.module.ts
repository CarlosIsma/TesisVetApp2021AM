import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesVeterinariasPage } from './detalles-veterinarias.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesVeterinariasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesVeterinariasPageRoutingModule {}
