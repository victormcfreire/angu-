import { EstadoBr } from './../shared/models/estado-br';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownService } from '../shared/services/dropdown.service';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup;
  estados!: EstadoBr[];
  cargos!: any[];
  //estados!: Observable<EstadoBr>;

  constructor(
    private _formBuilder: FormBuilder,
    private _http: HttpClient,
    private _dropdownService: DropdownService,
    private _cepService: ConsultaCepService
  ) { }

  ngOnInit(): void {

    /*this.estados = this._dropdownService.getEstadosBr().pipe(map((res: any) => res.UF));*/

    this._dropdownService.getEstadosBr()
        .subscribe(
          {
            next: (dados => {
              this.estados = dados;
              console.log(dados);
            })
          }
        );

    this.cargos = this._dropdownService.getCargos();
    /*this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null),
    });*/

    this.formulario = this._formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      endereco: this._formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),

      cargo: [null]
    });

  }

  onSubmit() {
    console.log(this.formulario);

    if (this.formulario.valid) {
      this._http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
        .pipe(map(res => res))
        .subscribe({
          next: (dados => {
            console.log(dados)
            //this.resetar();
          }),
          error: (error: any) => alert('error')
        });
    } else {
      console.log('formulario invalido');
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = this.formulario.get(campo);
      controle?.markAllAsTouched();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar() {
    this.formulario.reset();
  }

  verificaValidTouched(campo: string) {

    return (
      !this.formulario.get(campo)?.valid && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
    );
  }

  aplicaCssError(campo: string) {
    return {
      'is-invalid': this.verificaValidTouched(campo)
    };
  }

  consultaCep() {

    let cep = this.formulario.get('endereco.cep')?.value;

    if (cep != null && cep !== '') {
      this._cepService.consultaCep(cep)?.pipe()
        .subscribe(dados => this.populaDadosForm(dados));;
    }
  }

  populaDadosForm(dados: any) {
    if (!("erro" in dados)) {
      //Atualiza os campos com os valores da consulta.
      this.formulario.patchValue({
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
      this.resetaDadosForm();
      alert("CEP não encontrado.");
    }
  }

  resetaDadosForm() {
    this.formulario.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  setarCargo(){
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' };
    this.formulario.get('cargo')?.setValue(cargo);
  }

  compararCargos(obj1: any, obj2: any){
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

}
