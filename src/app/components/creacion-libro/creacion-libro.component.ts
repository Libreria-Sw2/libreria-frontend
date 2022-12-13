import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreacionLibroService } from 'src/app/services/creacion-libro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creacion-libro',
  templateUrl: './creacion-libro.component.html',
  styleUrls: ['./creacion-libro.component.css']
})
export class CreacionLibroComponent implements OnInit {
  
  libroInfo = new FormGroup({
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    autor: new FormControl('', Validators.required),
    editorial: new FormControl('', Validators.required),
    fechaDePublicacion: new FormControl('', Validators.required),
    codigoISBN: new FormControl('', Validators.required),
    lenguaje: new FormControl('', Validators.required),
    genero: new FormControl('', Validators.required),
    paginas: new FormControl(0, Validators.required),
    puntuacion: new FormControl(0, Validators.required)
  })

  selectedFiles?: FileList;
  portada?: File;
  archivo?: File;
  progress = 0;
  message = '';
  preview = '';

  libros?: Observable<any>;

  constructor(
    private router: Router,
    private creacionLibroService: CreacionLibroService
  ) {}

  archivoSeleccionado(event: any): void {
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        if (file.type.includes("image")) {
          this.message = '';
          this.preview = '';
          this.portada = file;
          this.progress = 0;
          const reader = new FileReader();
    
          reader.onload = (e: any) => {
            this.preview = e.target.result;
          };
    
          reader.readAsDataURL(this.portada);
        } else {
          this.archivo = file;
        }
      }
    }
  }
    
  onCrearLibro(form: any): void {
    this.creacionLibroService.crearLibro(JSON.stringify(form), this.portada!, this.archivo!).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.libros = this.creacionLibroService.obtenerLibros();
          }
        },
        error: (err: any) => {
          console.log(err);
          this.progress = 0;

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'No se pudo subir el archivo!';
          }
        }
      });

    this.portada = undefined;
    this.archivo = undefined
    this.selectedFiles = undefined;
    this.libroInfo.reset();
    this.router.navigateByUrl("/libreria");
    
  }

  ngOnInit(): void {
    this.libros = this.creacionLibroService.obtenerLibros();
  }
}
