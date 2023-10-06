import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable, of} from "rxjs";
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  public url: string;
  public dataResponse: any;
  public apiUrl: string = environment.apiUrl;
  constructor(public http: HttpClient) {
  }

  getListItem(params?: any): Observable<any>{
    return of({
      code: '00',
      data: fakeData,
      apiUrl: this.apiUrl
    })
  }
  updateItem(item?: any):Observable<any>{
    return of(randomResponse(item)).pipe(delay(800));
  }

  addItem(item?: any): Observable<any>{
    return of(randomResponse(item)).pipe(delay(800));
  }

  deleteItem(id?: any): Observable<any>{
    return of(randomResponse(id))
  }

  getItemById(id?: any): Observable<any>{
    const temp = fakeData.filter(item => item.id === id);
    if(temp?.length > 0){
      return of({
        code: '00',
        data: temp[0]
      });
    }else{
      return of({
        code: 'E05',
        message: 'Item không tồn tại'
      });
    }
  }

  duplicateUsername(): Observable<any>{
    return of(true);
  }
}
export const randomResponse = (item?: any) => {
  const randomNumber = Math.floor(Math.random() * 2) + 1;
  const arr = [
    {
      code: '00',
      data: item || [],
    },
    {
      code: 'E05',
      message: 'Có lỗi xảy ra'
    }
  ];
  return arr[randomNumber - 1];
}

export const fakeData = [
  {
    id: 1,
    name: 'Stephen Curry',
    code: 'The Chef',
    age: 35
  },
  {
    id: 2,
    name: 'Kevin Durant',
    code: 'Snake',
    age: 34
  },
  {
    id: 3,
    name: 'Lebron James',
    code: 'The King',
    age: 38
  },
  {
    id: 4,
    name: 'Giannis Antetokounmpo',
    code: 'Demigod',
    age: 30
  },
  {
    id: 5,
    name: 'Giannis Antetokounmpo',
    code: 'Demigod',
    age: 30
  },
  {
    id: 6,
    name: 'Giannis Antetokounmpo',
    code: 'Demigod',
    age: 30
  },
  {
    id: 7,
    name: 'Giannis Antetokounmpo',
    code: 'Demigod',
    age: 30
  },
  {
    id: 8,
    name: 'Giannis Antetokounmpo',
    code: 'Demigod',
    age: 30
  },
  {
    id: 9,
    name: 'Giannis Antetokounmpo',
    code: 'Demigod',
    age: 30
  },
  {
    id: 10,
    name: 'Giannis Antetokounmpo',
    code: 'Demigod',
    age: 30
  },
  {
    id: 11,
    name: 'Giannis Antetokounmpo',
    code: 'Demigod',
    age: 30
  },
  {
    id: 12,
    name: 'Giannis Antetokounmpo',
    code: 'Demigod',
    age: 30
  }
]
