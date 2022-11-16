import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  public url: string;
  public dataResponse: any;
  constructor(public http: HttpClient) {
  }

  getAll(p?: any): Observable<any>{
    return of({url: this.url, body: this.dataResponse});
    // return this.http.get<any>(this.url, {params: p, observe: 'response'});
  }
  updateItem(p?: any):Observable<any>{
    return of(p);
  }

  delete(id: any): Observable<any>{
    return of(id)
  }

  getDetail(id: any): Observable<any>{
    return of('Detail '+id);
  }
}
