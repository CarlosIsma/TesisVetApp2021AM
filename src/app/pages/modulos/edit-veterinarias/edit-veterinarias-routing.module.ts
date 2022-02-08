import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditVeterinariasPage } from './edit-veterinarias.page';

const routes: Routes = [
  {
    path: '',
    component: EditVeterinariasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditVeterinariasPageRoutingModule {}
