import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/inicio/login/login.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: 'registro-usuario',
    loadChildren: () =>
      import('./pages/inicio/registro-usuario/registro-usuario.module').then(
        (m) => m.RegistroUsuarioPageModule
      ),
  },
  {
    path: 'menu',
    loadChildren: () =>
      import('./pages/inicio/menu/menu.module').then((m) => m.MenuPageModule),
  },
  {
    path: 'usuario',
    loadChildren: () =>
      import('./pages/modulos/usuario/usuario.module').then(
        (m) => m.UsuarioPageModule
      ),
  },
  {
    path: 'completar-registro',
    loadChildren: () =>
      import(
        './pages/inicio/completar-registro/completar-registro.module'
      ).then((m) => m.CompletarRegistroPageModule),
  },
  {
    path: 'formulario-veterinaria',
    loadChildren: () =>
      import(
        './pages/modulos/formulario-veterinaria/formulario-veterinaria.module'
      ).then((m) => m.FormularioVeterinariaPageModule),
  },
  {
    path: 'veterinarias-lista',
    loadChildren: () =>
      import(
        './pages/modulos/veterinarias-lista/veterinarias-lista.module'
      ).then((m) => m.VeterinariasListaPageModule),
  },
  {
    path: 'ubicacion-veterinarias',
    loadChildren: () =>
      import(
        './pages/modulos/ubicacion-veterinarias/ubicacion-veterinarias.module'
      ).then((m) => m.UbicacionVeterinariasPageModule),
  },
  {
    path: 'detalles-veterinarias/:id',
    loadChildren: () =>
      import(
        './pages/modulos/detalles-veterinarias/detalles-veterinarias.module'
      ).then((m) => m.DetallesVeterinariasPageModule),
  },
  {
    path: 'gmap',
    loadChildren: () => import('./pages/modulos/gmap/gmap.module').then( m => m.GmapPageModule)
  },
  {
    path: 'info-veterinaria',
    loadChildren: () => import('./pages/modulos/info-veterinaria/info-veterinaria.module').then( m => m.InfoVeterinariaPageModule)
  },
  {
    path: 'edit-veterinarias',
    loadChildren: () => import('./pages/modulos/edit-veterinarias/edit-veterinarias.module').then( m => m.EditVeterinariasPageModule)
  },
  {
    path: 'edit-usuario',
    loadChildren: () => import('./pages/modulos/edit-usuario/edit-usuario.module').then( m => m.EditUsuarioPageModule)
  },
  {
    path: 'sent-email',
    loadChildren: () => import('./pages/modulos/sent-email/sent-email.module').then( m => m.SentEmailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
