import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreacionLibroComponent } from './components/creacion-libro/creacion-libro.component';
import { NavbarComponent } from './components/utils/navbar/navbar.component';
import { LibreriaComponent } from './components/libreria/libreria.component';
import { LibroComponent } from './components/libro/libro.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FilterPipe } from './components/utils/filter/filter.pipe';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { WebcamModule } from 'ngx-webcam';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PagosComponent } from './components/pagos/pagos.component';

@NgModule({
  declarations: [
    AppComponent,
    CreacionLibroComponent,
    NavbarComponent,
    LibreriaComponent,
    LibroComponent,
    FilterPipe,
    LoginComponent,
    RegistroComponent,
    PerfilComponent,
    PagosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PdfViewerModule,
    WebcamModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
