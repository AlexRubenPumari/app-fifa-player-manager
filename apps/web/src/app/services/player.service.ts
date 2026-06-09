import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private http = inject(HttpClient); //todo: probar sacandolo del appconfig

  private apiUrl = "http://localhost:3000/players"; //todo: centralizar y parametrizar

  getPlayers(filters: any, page: number): Observable<any> { //todo: 1) pq observable y pq el any? 2) como getPLayers sabe q le van a venir filters y page en ese orden? de donde lo recibe? de la url?
    let params = new HttpParams()
      .set('page', page.toString());
    
    return this.http.get<any>(this.apiUrl, { params }); //todo: sacar el any, como?
  }

  getPlayer(id: string | number): Observable<any> { //todo: any
    return this.http.get<any>(`${this.apiUrl}/${id}`);//todo: any
  }

  updatePlayer(id: string | number, data: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, data); //todo: data lo pone en el body? podrias darme un ejemplo?
  }

  createPlayer(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  downloadCsv(filters: any): Observable<Blob> { // todo: q es el tipo Blob??
    let params = new HttpParams().set('format', 'csv'); //todo: no entiendo q es eso de set??

    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null) {
          params = params.set(key, filters[key]);
        }
      });
    }

    // Ojo aquí: para descargar archivos necesitamos especificar responseType: 'blob'
    return this.http.get(this.apiUrl, { params, responseType: 'blob' });
  }
}
