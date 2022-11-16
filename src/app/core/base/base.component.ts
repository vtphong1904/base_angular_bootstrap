import {Component, EventEmitter, Injector, Input, Output} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder} from "@angular/forms";
import {ToastService} from "../../shared/components/toast.service";
import {BaseService} from "./base.service";
import {CONFIRM_DELETE_MODAL, CONFIRM_SAVE_MODAL} from "../../app.constants";

@Component({
  selector: 'app-base',
  template: ``,
  styles: []
})
export class BaseComponent {
  public fb: FormBuilder;
  public toastService: ToastService;
  public modalService: NgbModal;
  public listData: any;
  @Input() public data: any;
  @Output() eventClickModal: EventEmitter<any> = new EventEmitter();

  constructor(injector: Injector, private baseService?: BaseService) {
    this.fb = injector.get(FormBuilder);
    this.toastService = injector.get(ToastService);
    this.modalService = injector.get(NgbModal);
  }

  showToast(title?: any, type?: any) {
    this.toastService?.show(title,
      type === 'success' ? {classname: 'bg-success text-light', delay: 3000} : {
        classname: 'bg-danger text-light',
        delay: 3000
      })
  }

  openModal(component?: any, dataConfig?: any, callBack?: any) {
    const modalRef = this.modalService?.open(component, {centered: true});
    // @ts-ignore
    // data được khai báo ở @Input()
    modalRef.componentInstance.data = dataConfig;
    // @ts-ignore
    // Cách 1: Sử dụng eventClickModal

    // modalRef.componentInstance.eventClickModal.subscribe((value: any) => {
    //   callBack && callBack(value);
    // })

    // Cách 2: Sử dụng hàm mặc định
    modalRef?.result.then(
      result => {
        if (result === CONFIRM_SAVE_MODAL) {
          callBack && callBack(result);
        }else if(result === CONFIRM_DELETE_MODAL){
          callBack && callBack(result);
        }
      },
      reason => {
        console.log(reason)
      }
    )
  }

  getAll() {
    this.baseService?.getAll().subscribe(res => {
      if (res) {
        this.listData = res.body;
        // this.showToast('Get all data', 'success')
      }
    })
  }

  getDetail(id?: any) {
    this.baseService?.getDetail(id).subscribe(res => {
      console.log(res);
    })
  }

}
