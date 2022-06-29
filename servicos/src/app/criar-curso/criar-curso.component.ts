import { Component, OnInit } from '@angular/core';

import { CursoService } from './../cursos/cursos.service';

@Component({
  selector: 'app-criar-curso',
  templateUrl: './criar-curso.component.html',
  styleUrls: ['./criar-curso.component.scss'],
  providers: [CursoService]
})
export class CriarCursoComponent implements OnInit {

  cursos: string[] = [];

  constructor(private _cursoService: CursoService) { }

  ngOnInit(): void {
    this.cursos = this._cursoService.getCursos();
  }

  onAddCurso(curso: string){
    this._cursoService.addCursos(curso);
  }

}
