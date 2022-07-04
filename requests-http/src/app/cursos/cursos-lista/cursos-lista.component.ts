import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CursosService } from './../cursos.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Curso } from './curso';
import { catchError, EMPTY, Observable, Subject } from 'rxjs';
import { AlertModelService } from 'src/app/shared/alert-model.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  //cursos!: Curso[];
  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  //modalRef?: BsModalRef;

  constructor(
    private _cursosService: CursosService,
    private _alertService: AlertModelService
    //private _modalService: BsModalService
  ) { }

  ngOnInit(): void {
    //this._cursosService.list()
    //  .subscribe(dados => this.cursos = dados);

    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this._cursosService.list()
      .pipe(
        catchError(error => {
          console.error(error);
          //this.error$.next(true);
          this.handleError();
          return EMPTY;
        })
      );
    /*this._cursosService.list()
      .pipe(
        catchError(error => {
          console.log(error);
          this.error$.next(true);
          return EMPTY;
        })
      )
      .subscribe({
        next: (v) => {
          this.cursos$ = v;
        },
        error: (e) => {
          catchError(error => {
            this.error$.next(true);
            return EMPTY;
          })
        },
        complete: () => console.log('completo')
      });*/
  }

  handleError(){
    this._alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde')
    //this.modalRef = this._modalService.show(AlertModalComponent);
    //this.modalRef.content.type = 'danger';
    //this.modalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde';
  }
}
