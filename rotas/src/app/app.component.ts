import { AuthService } from './login/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rotas';

  mostrarMenu: boolean = false;

  constructor(private _authService: AuthService){}

  ngOnInit(){
    this._authService.mostrarMenuEmmiter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
  }
}
