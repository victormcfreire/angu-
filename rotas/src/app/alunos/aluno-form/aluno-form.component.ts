import { Component, OnInit } from '@angular/core';

import { AlunosService } from './../alunos.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.scss']
})
export class AlunoFormComponent implements OnInit {

  aluno: any = {};
  inscricao!: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _alunosService: AlunosService
  ) { }

  ngOnInit(): void {
    this.inscricao = this._route.params.subscribe(
      (params: any) => {
        let id = params['id'];

        this.aluno = this._alunosService.getAluno(id);

        if(this.aluno === null){
          this.aluno = {};
        }
      }
    );
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }
}
