import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { CursosService } from './../cursos/cursos.service';
import { AlertModelService } from './../shared/alert-model.service';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: CursosService,
    private modal: AlertModelService,
    private location: Location,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    /*this._route.params.subscribe(
      (params: any) => {
        const id = params['id'];
        console.log(id);
        const curso$ = this.service.getById(id);
        curso$.subscribe({
          next: (curso => {
            this.updateForm(curso);
          })
        });
      }
    );*/

    /*this._route.params
    .pipe(
      map((params: any) => params['id']),
      switchMap(id => this.service.getById(id))
    )
    .subscribe(curso => this.updateForm(curso));*/

    const curso = this._route.snapshot.data['curso'];

    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3)]],
    });
  }

  /*updateForm(curso: any){
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    });
  }*/

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('onSubmit');

      let msgError = 'Erro ao criar curso. Tente novamente';
      let msgSuccess = 'Curso criado com sucesso';
      if (this.form.value.id) {
        msgError = 'Erro ao atualizar curso. Tente novamente';
        msgSuccess = 'Curso atualizado com sucesso!';
      }

      this.service.save(this.form.value).subscribe({
        next: (s) => {
          this.modal.showAlertSuccess(msgSuccess);
          this.location.back();
        },
        error: (e) => this.modal.showAlertDanger(msgError),
        complete: () => console.log('save complete'),
      });

      /*if (this.form.value.id) {
        //update
        this.service.update(this.form.value).subscribe({
          next: (s) => {
            this.modal.showAlertSuccess('Curso atualizado com sucesso!');
            this.location.back();
          },
          error: (e) =>
            this.modal.showAlertDanger('Error ao atualizar curso. Tente novamente'),
          complete: () => console.log('update complete')
        });
      } else {
        this.service.create(this.form.value).subscribe({
          next: (s) => {
            this.modal.showAlertSuccess('Curso criado com sucesso!');
            this.location.back();
          },
          error: (e) =>
            this.modal.showAlertDanger('Error ao criar curso. Tente novamente'),
          complete: () => console.log('complete')
        });
      }*/
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    //console.log('onCancel');
  }
}
