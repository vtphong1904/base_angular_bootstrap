import {Component, Inject, Injector, OnInit} from '@angular/core';
import {BaseComponent} from "../../../core/base/base.component";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TestService} from "../test.service";
import {Validators} from "@angular/forms";
import {CONFIRM_SAVE_MODAL} from '../../../app.constants';

@Component({
  selector: 'app-add-or-edit',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.scss']
})
export class AddOrEditComponent extends BaseComponent implements OnInit {

  constructor(injector: Injector, private testService: TestService , public activeModal: NgbActiveModal) {
    super(injector, testService, activeModal);
  }

  ngOnInit(): void {
    this.initForm();
    this.getDetailById(1);
    this.asyncAddOrEditItem();
  }

  initForm(){
    this.formModel = this.fb.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      code: [null],
    })
  }
  save(){
    console.log('save')
    this.activeModal.close(CONFIRM_SAVE_MODAL);
  }

}
