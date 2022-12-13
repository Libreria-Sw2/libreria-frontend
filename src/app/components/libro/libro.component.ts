import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Libro } from 'src/app/models/libro.model';
import { CreacionLibroService } from 'src/app/services/creacion-libro.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {
  libro!: Observable<Libro>;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private creacionLibroService: CreacionLibroService
  ) {}

  ngOnInit(): void {
    const libroId = this.route.snapshot.paramMap.get('id');
    this.libro = this.creacionLibroService.obtenerLibro(libroId!);
  }
}
