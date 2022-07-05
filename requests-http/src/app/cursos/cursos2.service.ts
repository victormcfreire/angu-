import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Curso } from './cursos-lista/curso';
import { CurdService } from './../shared/curd-service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Cursos2Service extends CurdService<Curso> {

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.API}cursos`);
  }
}
