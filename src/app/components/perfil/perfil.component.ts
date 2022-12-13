import { Component } from '@angular/core';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  username: string | null = ''
  fotografia: string = 'data:image/jpeg;base64,'

  constructor(
    private localService: LocalService
  ) {}

  esAdministrador(): any {
    return this.localService.getData('tipo') == "Administrador";
  }

  ngOnInit(): void {
    this.username = this.localService.getData('nombre');
    this.fotografia = this.fotografia + this.localService.getData('photo');
  }
}
