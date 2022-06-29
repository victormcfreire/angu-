import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.scss']
})
export class ExemplosPipesComponent implements OnInit {

  filtro: string= '';

  livro: any = {
    titulo: 'Learning JavaScript Data Structures and Algorithms 2nd ed',
    rating: 4.54321,
    numeroPaginas: 314,
    preco: 44.99,
    dataLancamento: new Date(2016, 5, 23),
    url: 'http://a.co/glqjpRP'
  };

  livros: string[] = ['Java', 'Angular2'];

  valorAsync = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Valor assíncrono'), 2000);
  });

  valorAsync2 = new Observable<string>(observable => {
    setTimeout(() => {
      observable.next('Valor assíncrono 2');
    }, 2000);
  });

  constructor() { }

  ngOnInit(): void {
  }

  addLivro(livro: string){
    this.livros.push(livro);
    console.log(this.livros);
  }

  obterLivros(){
    if(this.livros.length === 0 || this.filtro === undefined ||
      this.filtro.trim() === ''){
      return this.livros;
    }

    let filter = this.filtro.toLocaleString().toLowerCase();
    return this.livros.filter((v:string) => v.toLowerCase().includes(filter));
  }
}
