import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioVeterinariaPage } from './formulario-veterinaria.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioVeterinariaPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioVeterinariaPageRoutingModule {}
