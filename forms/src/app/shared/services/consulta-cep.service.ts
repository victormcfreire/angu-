import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

constructor(private _http: HttpClient) { }

consultaCep(cep: string) {

  //Nova variável "cep" somente com dígitos.
  cep = cep.replace(/\D/g, '');

  if (cep != "") {
    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;
    var validacepTraco = /^[0-9]{5}-[0-9]{3}$/;

    //Valida o formato do CEP.
    if (validacep.test(cep) || validacepTraco.test(cep)) {
      return this._http.get(`//viacep.com.br/ws/${cep}/json`);
    }
  }

  return of({});
}

}
