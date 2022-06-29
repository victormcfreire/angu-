import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "./guards/auth.guard";
import { CursosGuard } from "./guards/cursos.guard";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PaginaNaoEncontradaComponent } from "./pagina-nao-encontrada/pagina-nao-encontrada.component";

const appRoutes: Routes = [
  { path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then(
        mod => mod.CursosModule
    ),
    canActivate:[AuthGuard],
    canActivateChild: [CursosGuard],
    canLoad: [AuthGuard]
  },
    { path: 'alunos',
    loadChildren: () => import('./alunos/alunos.module').then(
        mod => mod.AlunosModule
    ),
    canActivate:[AuthGuard],
    canLoad: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: '', redirectTo:'/home', pathMatch: 'full' },
  { path: '**', component: PaginaNaoEncontradaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
