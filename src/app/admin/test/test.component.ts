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

  formTest = this.fb.group({
    name: [null, Validators.required],
    address: [null, [Validators.required, Validators.maxLength(5)]],
    email: [null, [Validators.required, Validators.pattern(/[0-9]/)]]
  })

  columns = [
    {
      field: 'stt',
      display: 'STT',
      flex: 0.5
    },
    {
      field: 'name',
      display: 'Name',
      flex: 1
    },
    {
      field: 'age',
      display: 'Tuổi',
      flex: 0.6
    },
    {
      field: 'address',
      display: 'Địa chỉ',
      flex: 1.5
    },
    {
      field: 'actions',
      display: 'Hành động',
      actions: ['edit', 'delete'],
      flex: 1.5
    }
  ];
  dataTable: any;

  constructor(injector: Injector, private testService: TestService, private translocoService: TranslocoService) {
    super(injector, testService);
  }

  ngOnInit(): void {
    this.getAll();
    this.dataTable = this.listData;
  }

  actionClick(e: any) {
    // Sử dụng cho các button mặc định
    console.log(e)
  }

  addOrEditItem(row?: any) {
    this.openModal(AddOrEditComponent, row, (value: any) => {
      if(value === CONFIRM_SAVE_MODAL){
       this.showToast(row ? 'Cập nhật thành công' : 'Thêm mới thành công', 'success');
        this.getAll();
      }
    })
  }
  deleteItem(row: any){
    this.openModal(ConfirmComponent, row, (value: any) => {
      if(value === CONFIRM_DELETE_MODAL){
        this.showToast('Xoá thành công', 'success');
        this.getAll();
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
