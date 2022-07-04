import { environment } from './../../environments/environment';
import { Curso } from './cursos-lista/curso';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

private readonly API = `${environment.API}cursos`;

constructor(private _http: HttpClient) { }

list(){
  return this._http.get<Curso[]>(this.API)
    .pipe(
      delay(2000),
      tap(console.log)
    );
}

}
