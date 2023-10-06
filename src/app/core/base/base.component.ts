import {Component, EventEmitter, Injector, Input, Output} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BaseService} from "./base.service";
import {ToastService} from '@shared/components/toast.service';
import {
  ADD_ITEM_SUCCESS,
  CONFIRM_DELETE_MODAL,
  CONFIRM_SAVE_MODAL, DELETE_ITEM_SUCCESS, MESSAGE_ERROR_DEFAULT,
  RESPONSE_CODE_SUCCESS,
  TOAST_DANGER,
  TOAST_SUCCESS, UPDATE_ITEM_SUCCESS
} from "../../app.constants";
import {catchError, of, Subject, Subscription, switchMap, takeUntil} from 'rxjs';

@Component({
  selector: 'app-base',
  template: ``,
  styles: []
})
export class BaseComponent {
  public fb: FormBuilder;
  public baseService: BaseService | undefined;
  public toastService: ToastService;
  /*Modal dialog*/
  public modalService: NgbModal;
  public modalRef: NgbActiveModal | undefined;
  public dataModal: any;

  public listItem: any;
  public itemDetail: any;
  public formModel: FormGroup;
  public formSearch: FormGroup;

  public save$ = new Subject();

  public _destroy$ = new Subject();
  public _subscriptionAll$ = new Subscription();

  constructor(injector: Injector, service?: BaseService, modalActive?: NgbActiveModal) {
    this.fb = injector.get(FormBuilder);
    this.toastService = injector.get(ToastService);
    this.modalService = injector.get(NgbModal);

    this.baseService = service;
    this.modalRef = modalActive;
  }

  showToast(title?: any, type?: any) {
    this.toastService?.show(title,
      type === TOAST_SUCCESS ? {classname: 'bg-success text-light', delay: 3000} : {
        classname: 'bg-danger text-light',
        delay: 3000
      })
  }

  openModal(component?: any, dataConfig?: any, callBack?: any) {
    const modalRef = this.modalService?.open(component, {centered: true});
    // @ts-ignore
    // Gán dữ liệu vào dataModal
    modalRef.componentInstance.dataModal = dataConfig;

    // Cách 2: Sử dụng activeModal: NgbActiveModal
    modalRef?.result.then(
      result => {
        console.log('Click to action modal dialog', result);
        callBack && callBack(result)
        /*if (result === CONFIRM_SAVE_MODAL) {
          callBack && callBack(result);
        }else if(result === CONFIRM_DELETE_MODAL){
          callBack && callBack(result);
        }*/
      },
      reason => {
        console.log('Dismiss modal dialog', reason)
      }
    )
  }

  getAll(param?: any) {
    this.baseService?.getListItem(param).pipe(takeUntil(this._destroy$)).subscribe(res => {
      this.handleListItemResponse(res);
    })
  }

  handleListItemResponse(res: any){
    console.log('Get list item', res)
    if(res.code === RESPONSE_CODE_SUCCESS){
      this.listItem = res.data;
    }else{
      this.showToast(res?.message || MESSAGE_ERROR_DEFAULT, TOAST_DANGER);
    }
  }

  addNewItem(item?: any) {
    this?.baseService?.addItem(item).pipe(takeUntil(this._destroy$)).subscribe((res) => {
      if (res.code === RESPONSE_CODE_SUCCESS) {
        console.log('Add success', res);
        this.showToast(ADD_ITEM_SUCCESS, TOAST_SUCCESS);
        this.modalRef?.close('reload')
      } else {
        console.log('Add fail', res);
        this.showToast(res?.message || MESSAGE_ERROR_DEFAULT, TOAST_DANGER);
      }
    })
  }

  asyncAddOrEditItem() {
    this.save$.pipe(
        // @ts-ignore
        switchMap((obj: any) => {
          if (obj?.id) {
            return this.baseService?.updateItem(obj).pipe(catchError(err => of(null)));
          } else {
            return this.baseService?.addItem(obj).pipe(catchError(err => of(null)));
          }
        }),
        takeUntil(this._destroy$),
        catchError(err => of(null))
    ).subscribe((res: any) => {
      if (res.code === RESPONSE_CODE_SUCCESS) {
        console.log('Add or edit success', res);
        this.showToast(this.itemDetail ? UPDATE_ITEM_SUCCESS : ADD_ITEM_SUCCESS, TOAST_SUCCESS);
        this.modalRef?.close('reload');
      } else {
        console.log('Add or edit fail', res);
        this.showToast(res.message || MESSAGE_ERROR_DEFAULT, TOAST_DANGER)
      }
    })
  }

  getDetailById(id?: any, callback?: any) {
    this.baseService?.getItemById(id).pipe(takeUntil(this._destroy$)).subscribe((res: any) => {
      if (res.code === RESPONSE_CODE_SUCCESS) {
        console.log('Detail item', res);
        this.itemDetail = res.data;
        this.formModel?.patchValue(callback ? callback(this.itemDetail) : this.itemDetail);
      } else {
        console.log('Detail', res);
        this.showToast(res.message, TOAST_DANGER)
      }
    })
  }

  editItem(item?: any) {
    this.baseService?.updateItem(item).pipe(takeUntil(this._destroy$)).subscribe((res: any) => {
      if (res.code === RESPONSE_CODE_SUCCESS) {
        console.log('Update success', res)
        this.showToast(UPDATE_ITEM_SUCCESS, TOAST_SUCCESS);
      } else {
        console.log('Update fail', res)
        this.showToast(res.message || MESSAGE_ERROR_DEFAULT, TOAST_DANGER);
      }
    })
  }

  deleteItem(id?: any) {
    this.baseService?.deleteItem(id).pipe(takeUntil(this._destroy$)).subscribe((res) => {
      if (res.code === RESPONSE_CODE_SUCCESS) {
        console.log('Delete success', res);
        this.showToast(DELETE_ITEM_SUCCESS, TOAST_SUCCESS);
      } else {
        console.log('Delete fail', res);
        this.showToast(res.message || MESSAGE_ERROR_DEFAULT, TOAST_DANGER)
      }
    })
  }

}
