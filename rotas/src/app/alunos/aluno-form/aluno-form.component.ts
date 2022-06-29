import { Component, OnInit } from '@angular/core';

import { AlunosService } from './../alunos.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IFormCanDeactivate } from 'src/app/guards/iform-candeactivate';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.scss']
})
export class AlunoFormComponent implements OnInit, IFormCanDeactivate {

  aluno: any = {};
  inscricao!: Subscription;
  private formMudou: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _alunosService: AlunosService
  ) { }

    onInput(){
      this.formMudou = true;
      console.log('mudou');
    }

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

  podeMudarRota(){
    if(this.formMudou){
      confirm('Tem certeza que deseja sair dessa página?');
    }

    return true;
  }

  podeDesativar() {
    return this.podeMudarRota();
  }
}
