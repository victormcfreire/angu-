import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

  url: string = 'http://loiane.com';
  urlImagem: string = 'https://picsum.photos/400/200';
  valorAtual: string = '';
  valorSalvo: string = '';
  nome = 'abc';

  pessoa = {
    nome: 'alek',
    idade: 20
  };

  nomeDoCurso: string = 'Angular';

  isMouseOver: boolean = false;

  getValor() {
    return 1;
  }

  botaoClicado(){
    alert('Botão clicado!');
  }

  onKeyUp(evento: KeyboardEvent){
    this.valorAtual = (<HTMLInputElement>evento.target).value;
  }

  salvarValor(valor:string){
    this.valorSalvo = valor;
  }

  onMouseOverOut(){
    this.isMouseOver = !this.isMouseOver;
  }

  onMudouValor(evento: any){
    console.log(evento.novoValor);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
