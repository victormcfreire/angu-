import { CursoResolverGuard } from './guards/curso-resolver.service';
import { CursosFormComponent } from './../cursos-form/cursos-form.component';
import { CursosListaComponent } from './cursos-lista/cursos-lista.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'novo',
    component: CursosFormComponent,
    resolve: {
      curso: CursoResolverGuard,
    },
  },
  {
    path: 'editar/:id',
    component: CursosFormComponent,
    resolve: {
      curso: CursoResolverGuard,
    },
  },
  { path: '', component: CursosListaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosRoutingModule {}
