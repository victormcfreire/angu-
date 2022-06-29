import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, retry } from 'rxjs';

//import { AlunoFormComponent } from '../aluno-form/aluno-form.component';
import { IFormCanDeactivate } from '../../guards/iform-candeactivate';

@Injectable()
export class AlunosDeactivateGuard implements CanDeactivate<IFormCanDeactivate> {

  canDeactivate(
    component: IFormCanDeactivate
  ,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | Promise<boolean> | boolean {

    console.log('guard de desativação');
    //return component.podeMudarRota() ? component.podeMudarRota() : true;

    return component.podeDesativar();
  }
}
