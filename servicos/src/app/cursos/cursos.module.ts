import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosComponent } from './cursos.component';
//import { CursoService } from './cursos.service';

@NgModule({
  declarations: [
    CursosComponent
  ],
  imports: [
    CommonModule
  ],
  //providers: [CursoService],
  exports: [
    CursosComponent
  ]
})
export class CursosModule { }
