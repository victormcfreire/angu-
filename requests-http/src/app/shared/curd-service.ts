import { delay, tap, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export class CurdService<T> {

  constructor(protected _http: HttpClient, private API_URL: any){}

  list() {
    return this._http
      .get<T[]>(this.API_URL)
      .pipe(delay(2000), tap(console.log));
  }

  getById(id: number) {
    return this._http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  private create(record: any) {
    return this._http.post(this.API_URL, record).pipe(take(1));
  }

  private update(record: any) {
    return this._http.put(`${this.API_URL}/${record.id}`, record).pipe(take(1));
  }

  save(record: any) {
    if (record.id) {
      return this.update(record);
    }
    return this.create(record);
  }

  delete(id: number) {
    return this._http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }
}
