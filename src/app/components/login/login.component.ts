import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LocalService } from 'src/app/services/local.service';
import { SubcripcionService } from 'src/app/services/subcripcion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private trigger: Subject<any> = new Subject();
  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();
  usuario = {
    "name": '',
    "photo": ''
  }
  subcripcion = {
    "user_name": '',
    "password": '',
  }
  username: string = '';
  password: string = '';
  tipo: string = '';

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private subcripcionService: SubcripcionService,
    private local: LocalService
  ) {}

  ngOnInit() {}
  
  public changeTipo(tipo: string): void {
    this.local.saveData('tipo', tipo);
  }

  public getSnapshot(): void {
    this.trigger.next(void 0);
  }
  
  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.usuario.photo = webcamImage!.imageAsDataUrl.replace('data:image/jpeg;base64,', '');
    console.info('got webcam image', this.usuario.photo);
  }
  
  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }
  
  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

  verificarUsuario(): void {
    this.usuario.name = this.username;
    this.subcripcion.user_name = this.username;
    this.subcripcion.password = this.password;
    console.log(this.usuario);
    console.log(this.subcripcion);
    let esLoginCorrecto = false;

    this.subcripcionService.login(this.subcripcion).subscribe(
      (data) => {
        if ("body" in data) {
          console.log(data.body);
          if ("message" in data.body){
            let message: string = data.body.message;
            if (message.includes('OK')){
              esLoginCorrecto = true;
              if ("subcripcion" in data.body) {
                let subcripcion: number = data.body.subcripcion;
                if (subcripcion == null) {
                  alert("Usted no esta suscrito a ningun plan")
                }
              }
            } else {
              alert(data.body.message);
            }
          }
        }
      },
      (error) => {console.log(error)}
    )

    this.usuarioService.verificarUsuario(this.usuario).subscribe(
      (data) => {
        if ("body" in data) {
          if (esLoginCorrecto) {
            this.router.navigateByUrl("/libreria");
          }
        }
      },
      (error) => {
        alert("Imagen comparada incorrecta, favor de mirar a la camara")
      }
    );
  }
}
