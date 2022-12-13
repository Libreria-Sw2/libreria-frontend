import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CreacionLibroService } from 'src/app/services/creacion-libro.service';

@Component({
  selector: 'app-libreria',
  templateUrl: './libreria.component.html',
  styleUrls: ['./libreria.component.css']
})
export class LibreriaComponent implements OnInit {

  libros!: Observable<any>;
  categoria: string = 'titulo';
  searchText: string = '';

  constructor(private creacionLibroService: CreacionLibroService) {}

  public repetirEstrella(valor: string, repeticion: number) : any {
    return valor.repeat(repeticion);
  }

  public buscar(cadenaABuscar: string) : void {
    this.libros = this.creacionLibroService.busquedaLibroCategoria(this.categoria, cadenaABuscar);
    console.log(this.libros);
  }

  ngOnInit(): void {
    this.libros = this.creacionLibroService.obtenerLibros();
  }
}
