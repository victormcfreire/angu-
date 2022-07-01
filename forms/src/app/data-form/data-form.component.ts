import { BaseFormComponent } from './../shared/base-form/base-form.component';
import { VerificaEmailService } from './services/verifica-email.service';
import { EstadoBr } from './../shared/models/estado-br';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownService } from '../shared/services/dropdown.service';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { EMPTY, Observable } from 'rxjs';
import { FormValidations } from '../shared/form-validation';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {

  //formulario!: FormGroup;
  estados!: EstadoBr[];
  cargos!: any[];
  tecnologias!: any[];
  newsletterOp!: any[];

  frameworks: string[] = ['Angular', 'React', 'Vue', 'Sencha'];
  //estados!: Observable<EstadoBr>;

  constructor(
    private _formBuilder: FormBuilder,
    private _http: HttpClient,
    private _dropdownService: DropdownService,
    private _cepService: ConsultaCepService,
    private _verificarEmailService: VerificaEmailService
  ) {
    super();
  }

  override ngOnInit(): void {

    //this._verificarEmailService.verificarEmail('email@email.com').subscribe()

    /*this.estados = this._dropdownService.getEstadosBr().pipe(map((res: any) => res.UF));*/

    this._dropdownService.getEstadosBr()
      .subscribe(
        {
          next: (dados => {
            this.estados = dados;
          })
        }
      );

    this.cargos = this._dropdownService.getCargos();
    /*this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null),
    });*/

    this.tecnologias = this._dropdownService.getTecnologias();
    this.newsletterOp = this._dropdownService.getNewsletter();

    this.formulario = this._formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
      confirmarEmail: [null, FormValidations.equalsTo('email')],
      endereco: this._formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),

      cargo: [null],
      tecnologia: [null],
      newsletter: ['s'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    });

    this.formulario.get('endereco.cep')?.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status CEP:', value)),
        switchMap(status => status === 'VALID' ?
        this._cepService.consultaCep(this.formulario.get('endereco.cep')?.value)
        : EMPTY)
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados) : {});
  }


  buildFrameworks() {
    var valuesobj = this.frameworks.map(obj => { return obj });

    const values = valuesobj.map(v => new FormControl(false));

    return this._formBuilder.array(values, FormValidations.requiredMinCheckbox(1));

  }

  getFrameworksControls() {
    return this.formulario.get('frameworks') ? (<FormArray>this.formulario.get('frameworks')).controls : null;
  }

  submit() {
    console.log(this.formulario);

    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v: any, i: any) => v ? this.frameworks[i] : null)
        .filter((v: any) => v !== null)
    });

    this._http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
        .pipe(map(res => res))
        .subscribe({
          next: (dados => {
            console.log(dados)
            //this.resetar();
          }),
          error: (error: any) => alert('error')
        });
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
        cep: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  setarCargo() {
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' };
    this.formulario.get('cargo')?.setValue(cargo);
  }

  compararCargos(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

  validarEmail(formControl: FormControl) {
    return this._verificarEmailService.verificarEmail(formControl.value)
      .pipe(
        map(emailExiste => emailExiste ? { emailInvalido: true } : null)
      );
  }
}
