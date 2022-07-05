import { environment } from './../../environments/environment';
import { Curso } from './cursos-lista/curso';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private readonly API = `${environment.API}cursos`;

  constructor(private _http: HttpClient) {}

  list() {
    return this._http
      .get<Curso[]>(this.API)
      .pipe(delay(2000), tap(console.log));
  }

  getById(id: number) {
    return this._http.get<Curso>(`${this.API}/${id}`).pipe(take(1));
  }

  private create(curso: any) {
    return this._http.post(this.API, curso).pipe(take(1));
  }

  private update(curso: any) {
    return this._http.put(`${this.API}/${curso.id}`, curso).pipe(take(1));
  }

  save(curso: any) {
    if (curso.id) {
      return this.update(curso);
    }
    return this.create(curso);
  }

  delete(id: number) {
    return this._http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
