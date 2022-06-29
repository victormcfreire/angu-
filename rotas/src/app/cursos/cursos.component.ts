import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  cursos: any[] = [];
  pagina!: number;
  inscricao!: Subscription;

  constructor(
    private _cursosService: CursosService,
    private _routes: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit(): void {
    this.cursos = this._cursosService.getCursos();

    this.inscricao = this._routes.queryParams.subscribe(
      (queryParams: any) => {
        this.pagina = queryParams['pagina'];
      }
    );
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

  proximaPagina(){
    //this.pagina++;
    this._router.navigate(['/cursos'],
    {queryParams: {'pagina': ++this.pagina}});
  }
}
