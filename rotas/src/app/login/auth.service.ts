import { EventEmitter, Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioAutenticado: boolean = false;
  mostrarMenuEmmiter = new EventEmitter<boolean>();

  constructor(private _router: Router) {
  }

  fazerLogin(usuario: Usuario) {
    if (usuario.nome === "usuario@email.com" &&
      usuario.senha === "123456") {
      this.usuarioAutenticado = true;

      this.mostrarMenuEmmiter.emit(true);

      this._router.navigate(['/']);

    } else {
      this.usuarioAutenticado = false;
      this.mostrarMenuEmmiter.emit(false);

    }
  }
}
