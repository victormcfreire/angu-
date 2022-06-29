import { EventEmitter, Injectable } from "@angular/core";

import { LogService } from "../shared/log.service";

@Injectable()
export class CursoService{

  cursos: string[] = ['Angular', 'Java', 'Phonegap'];
  emitirCursoCriado = new EventEmitter<string>();
  static criouNovoCurso = new EventEmitter<string>();

  constructor(private _logService: LogService){
    console.log('CursoService');
  }

  getCursos(){
    this._logService.consoleLog('Obtendo lista de cursos');
    return this.cursos;
  }

  addCursos(curso: string){
    this._logService.consoleLog(`Criando um novo curso ${curso}`)
    this.cursos.push(curso);
    this.emitirCursoCriado.emit(curso);
    CursoService.criouNovoCurso.emit(curso);
  }
}
