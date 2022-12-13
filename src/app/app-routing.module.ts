import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreacionLibroComponent } from './components/creacion-libro/creacion-libro.component';
import { LibreriaComponent } from './components/libreria/libreria.component';
import { LibroComponent } from './components/libro/libro.component';
import { LoginComponent } from './components/login/login.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  {path: 'creacionLibro', component: CreacionLibroComponent},
  {path: 'libreria', component: LibreriaComponent},
  {path: 'libro/:id', component: LibroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'pagos', component: PagosComponent},
  {path: '',   redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
