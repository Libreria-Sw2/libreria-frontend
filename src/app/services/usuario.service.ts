import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  private baseURL = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  registrarUsuario(data: object): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', this.baseURL + "/register_user", data)

    return this.http.request(req);
  }

  verificarUsuario(data: object): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', this.baseURL + "/validate_user", data)

    return this.http.request(req);
  }

}
