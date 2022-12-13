import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  private baseURL = 'http://127.0.0.1:5002/api/v1';

  constructor(private http: HttpClient) { }

  generarQR(data: object): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', this.baseURL + "/pay", data)

    return this.http.request(req);
  }

  callback(data: object): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', this.baseURL + "/callback", data)

    return this.http.request(req);
  }

  confirmarTransaccion(data: object): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', this.baseURL + "/callback", data)

    return this.http.request(req);
  }
}
