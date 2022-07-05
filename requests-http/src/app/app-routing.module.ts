import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'upload'
  },
  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then(mod => mod.CursosModule)
  },
  {
    path: 'upload',
    loadChildren: () => import('./upload-file/upload-file.module').then(mod => mod.UploadFileModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
