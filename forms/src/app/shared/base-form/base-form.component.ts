import { FormGroup, FormArray } from '@angular/forms';
import { Component, OnInit, Directive } from '@angular/core';

@Component({
  selector: 'app-base-form',
  template: '<br>'
})
export abstract class BaseFormComponent implements OnInit {

  formulario!: FormGroup

  constructor() { }

  ngOnInit(): void {

  }

  abstract submit(): any;

  onSubmit() {
    if (this.formulario.valid) {
      this.submit()
    } else {
      console.log('formulario invalido');
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle: any = this.formulario.get(campo);
      controle?.markAllAsTouched();
      controle?.markAsDirty();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
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

  verificaRequired(campo: string){
    return(
      this.formulario.get(campo)?.hasError('required') &&
      (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
    )
  }

  verificaEmailInvalido(){
    const campoEmail = this.formulario.get('email');
    if(campoEmail?.errors){
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  aplicaCssError(campo: string) {
    return {
      'is-invalid': this.verificaValidTouched(campo)
    };
  }

  getCampo(campo: string){
    return this.formulario.get(campo);
  }

}
