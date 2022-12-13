import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LocalService } from 'src/app/services/local.service';
import { SubcripcionService } from 'src/app/services/subcripcion.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  private trigger: Subject<any> = new Subject();
  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();
  usuario = { "name": '', "photo": ''};
  subcripcion = { "name": '', "user_name": '', "phone": '', "password": '', "photo": ''};
  name: string = '';
  username: string = '';
  password: string = '';
  phone: string = '';

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private subcripcionService: SubcripcionService,
    private localService: LocalService
  ) {}

  ngOnInit() {}
  
  public getSnapshot(): void {
    this.trigger.next(void 0);
  }
  
  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.usuario.photo = webcamImage!.imageAsDataUrl.replace('data:image/jpeg;base64,', '');
    this.subcripcion.photo = webcamImage!.imageAsDataUrl.replace('data:image/jpeg;base64,', '');
    console.info('got webcam image', this.usuario.photo);
  }
  
  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }
  
  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

  registrarUsuario(): void {
    this.usuario.name = this.username;
    
    this.subcripcion.name = this.name;
    this.subcripcion.password = this.password;
    this.subcripcion.phone = this.phone;
    this.subcripcion.user_name = this.username;

    this.localService.saveData('nombre', this.subcripcion.name);
    this.localService.saveData('photo', this.subcripcion.photo);
    this.localService.saveData('username', this.subcripcion.user_name);
    this.localService.saveData('phone', this.subcripcion.phone);

    this.subcripcionService.crearUsuario(this.subcripcion).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    )
    
    this.usuarioService.registrarUsuario(this.usuario).subscribe(
      (data) => {
        if ("body" in data) {
          this.localService.saveData('idUser', data.body.id);
        }
      },
      (error) => {console.log(error)}
    );
    

    this.usuario.name = '';
    this.usuario.photo = '';
    this.router.navigateByUrl("/pagos");
  }

}
