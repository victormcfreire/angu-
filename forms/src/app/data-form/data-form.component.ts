import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _http: HttpClient
  ) { }

  ngOnInit(): void {

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
      })
    });

  }

  onSubmit() {
    console.log(this.formulario);

    this._http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .pipe(map(res => res))
      .subscribe({
        next: (dados => {
          console.log(dados)
          //this.resetar();
        }),
        error: (error: any) => alert('error')
      });
  }

  resetar() {
    this.formulario.reset();
  }

  verificaValidTouched(campo: string) {

    return !this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched;
  }

  aplicaCssError(campo: string) {
    return {
      'is-invalid': this.verificaValidTouched(campo)
    };
  }

}
