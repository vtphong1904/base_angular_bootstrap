import { Injectable } from '@angular/core';
import {BaseService} from "../../core/base/base.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TestService extends BaseService{
  listData = [
    {
      stt: 1,
      name: 'Phong',
      age: 23,
      address: 'Nam Định'
    },
    {
      stt: 2,
      name: 'Leonor',
      age: 17,
      address: 'Spain'
    },
    {
      stt: 3,
      name: 'Maria Valverder',
      age: 23,
      address: 'Spain'
    }
  ]
  // @ts-ignore
  constructor(public http: HttpClient) {
    super(http);
    this.url = 'api/test';
    this.dataResponse = this.listData;
  }
}
