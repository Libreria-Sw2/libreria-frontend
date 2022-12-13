import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreacionLibroService {

  private baseURL = 'http://localhost:8080/api/libros/';

  constructor(private http: HttpClient) { }

  crearLibro(libro: string, portada:File, archivo: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('libro', libro);
    formData.append('portada', portada);
    formData.append('archivo', archivo);

    const req = new HttpRequest('POST', this.baseURL, formData, {
      reportProgress: true,
      responseType: 'json'
    })

    return this.http.request(req);
  }

  obtenerLibro(id : string): Observable<any> {
    return this.http.get(this.baseURL + "search?id=" + id);
  }

  obtenerLibros(): Observable<any> {
    return this.http.get(this.baseURL);
  }

  busquedaLibroCategoria(categoria: string, busqueda: string): Observable<any> {
    return this.http.get("searchLibros?categoria=" + categoria + "&busqueda=" + busqueda)
  }
}
