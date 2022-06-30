import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  }

  constructor(private _http: HttpClient) { }

  onSubmit(form: any) {
    this._http.post('https://httpbin.org/post', JSON.stringify(form.value))
      .pipe(map(res => res))
      .subscribe(dados => console.log(dados));
  }

  consultaCep(cep: any, form: any) {
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {

        this.resetaDadosForm(form);

        this._http.get(`//viacep.com.br/ws/${cep}/json/`)
          .pipe(map((dados: any) => dados))
          .subscribe(dados => this.populaDadosForm(dados, form));
      }
    }
  }

  populaDadosForm(dados: any, formulario: any) {

    if (!("erro" in dados)) {
      //Atualiza os campos com os valores da consulta.
      formulario.form.patchValue({
        endereco: {
          rua: dados.logradouro,
          cep: dados.cep,
          complemento: dados.complemento,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf
        }
      });
    } //end if.
    else {
      //CEP pesquisado não foi encontrado.
      this.resetaDadosForm(formulario);
      alert("CEP não encontrado.");
    }
  }

  resetaDadosForm(formulario: any) {
    formulario.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  ngOnInit(): void {
  }

  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched;
  }

  aplicaCssError(campo: any) {
    return {
      'is-invalid': this.verificaValidTouched(campo)
    };
  }

}
