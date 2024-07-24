import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea } from '../models/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private baseUrl = 'http://localhost:8080/api/tareas';

  constructor(private http: HttpClient) { }

  getAllTareas():Observable<Tarea[]>{
    return this.http.get<Tarea[]>(this.baseUrl);
  }

  getTareaById(id: number): Observable<Tarea>{
    return this.http.get<Tarea>(`${this.baseUrl}/${id}`);
  }

  createTarea(tarea: Tarea): Observable<Tarea>{
    return this.http.post<Tarea>(this.baseUrl, tarea)
  }

  updateTarea(id: number, tarea: Tarea): Observable<Tarea>{
    return this.http.put<Tarea>(`${this.baseUrl}/${id}`, tarea);
  }

  deleteTarea(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
