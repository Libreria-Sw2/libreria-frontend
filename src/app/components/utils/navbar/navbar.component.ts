import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nombre: string | null = ''

  constructor(
    private localService: LocalService
  ) {}

  esAdministrador(): any {
    return this.localService.getData('tipo') == "Administrador";
  }

  ngOnInit(): void {
    this.nombre = this.localService.getData('nombre');
  }
}
