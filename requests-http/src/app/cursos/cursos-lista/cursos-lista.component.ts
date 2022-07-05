import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CursosService } from './../cursos.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Curso } from './curso';
import { catchError, EMPTY, Observable, Subject, take, switchMap } from 'rxjs';
import { AlertModelService } from 'src/app/shared/alert-model.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
})
export class CursosListaComponent implements OnInit {
  //cursos!: Curso[];
  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  deleteModalRef!: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;
  cursoSelecionado!: Curso;
  //modalRef?: BsModalRef;

  constructor(
    private _cursosService: Cursos2Service,
    private _alertService: AlertModelService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _modalService: BsModalService
  ) {}

  ngOnInit(): void {
    //this._cursosService.list()
    //  .subscribe(dados => this.cursos = dados);

    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this._cursosService.list().pipe(
      catchError((error) => {
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

  handleError() {
    this._alertService.showAlertDanger(
      'Erro ao carregar cursos. Tente novamente mais tarde'
    );
    //this.modalRef = this._modalService.show(AlertModalComponent);
    //this.modalRef.content.type = 'danger';
    //this.modalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde';
  }

  onEdit(cursoId: number) {
    this._router.navigate(['editar', cursoId], { relativeTo: this._route });
  }

  onDelete(curso: any) {
    this.cursoSelecionado = curso;
    const result$ = this._alertService.showConfirm(
      'Confirmação',
      'Deseja deletar esse registro?',
      'Sim',
      'Não'
    );
    result$.asObservable().pipe(
      take(1),
      switchMap(result => result ? this._cursosService.delete(curso.id) : EMPTY)
    )
      .subscribe({
        next: (success) => {
          this.onRefresh();
        },
        error: (error) => {
          this._alertService.showAlertDanger(
            'Erro ao deletar curso. Tente novamente mais tarde'
          );
        },
      });
    //this.deleteModalRef = this._modalService.show(this.deleteModal, {class: 'modal-sm',});
  }

  onConfirmDelete() {
    this._cursosService.delete(this.cursoSelecionado.id).subscribe({
      next: (success) => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      error: (error) => {
        this.deleteModalRef.hide();
        this._alertService.showAlertDanger(
          'Erro ao deletar curso. Tente novamente mais tarde'
        );
      },
    });
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}
