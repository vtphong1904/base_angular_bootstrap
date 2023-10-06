import {Component, Injector, OnInit} from '@angular/core';
import {BaseComponent} from "../../core/base/base.component";
import {AddOrEditComponent} from "./add-or-edit/add-or-edit.component";
import {Validators} from "@angular/forms";
import {TestService} from "./test.service";
import {CONFIRM_DELETE_MODAL, CONFIRM_SAVE_MODAL} from "../../app.constants";
import {ConfirmComponent} from "../../shared/components/confirm/confirm.component";
import {TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent extends BaseComponent implements OnInit {

  columns = [
    {
      field: 'id',
      display: 'STT',
      flex: 0.5
    },
    {
      field: 'name',
      display: 'Name',
      flex: 1
    },
    {
      field: 'code',
      display: 'Code',
      flex: 0.6
    },
    {
      field: 'age',
      display: 'Age',
      flex: 0.8
    },
    {
      field: 'actions',
      display: 'Hành động',
      actions: ['edit', 'delete'],
      flex: 0.5
    }
  ];
  dataTable: any;

  constructor(injector: Injector, private testService: TestService, private translocoService: TranslocoService) {
    super(injector, testService);
  }

  ngOnInit(): void {
    this.getAll();
  }

  actionClick(e: any) {
    // Sử dụng cho các button mặc định
    console.log(e)
  }

  addOrEditItem(row?: any) {
    this.openModal(AddOrEditComponent, row, (value: any) => {
      console.log('Close dialog modal', value)
    })
  }
  openConfirmDelete(row: any){
    this.openModal(ConfirmComponent, row, (value: any) => {
      if(value === CONFIRM_DELETE_MODAL){
        this.deleteItem(row?.id)
      }
    })
  }

  showAge(data?: any) {
    alert('Click view age')
    console.log(data)
  }

  changeLanguage() {
    const lang = this.translocoService.getActiveLang();
    this.translocoService.setActiveLang(lang === 'vn' ? 'en' : 'vn')
  }
}
