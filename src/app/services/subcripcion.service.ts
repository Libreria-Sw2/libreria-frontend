import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcripcionService {


  private baseURL = 'http://127.0.0.1:3000/user';

  constructor(private http: HttpClient) { }

  crearUsuario(data: object): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', this.baseURL + "/", data)

    return this.http.request(req);
  }

  login(data: object): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', this.baseURL + "/login", data)

    return this.http.request(req);
  }
 
  adicionarSubcripcion(data:object): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', this.baseURL + "/add_suscription", data)

    return this.http.request(req);
  }
}
