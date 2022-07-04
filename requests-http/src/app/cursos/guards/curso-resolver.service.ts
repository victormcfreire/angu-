import { CursosService } from './../cursos.service';
import { Curso } from './../cursos-lista/curso';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CursoResolverGuard implements Resolve<Curso> {
  constructor(private service: CursosService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Curso> | Observable<any> {
    if (route.params && route.params['id']) {
      return this.service.getById(route.params['id']);
    }

    return of({
      id: null,
      nome: null,
    });
  }
}
