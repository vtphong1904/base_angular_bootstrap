import {Component, Injector, OnInit} from '@angular/core';
import {BaseComponent} from "../../../core/base/base.component";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TestService} from "../test.service";
import {CLOSE_MODAL, CONFIRM_SAVE_MODAL} from "../../../app.constants";
import {Validators} from "@angular/forms";

@Component({
  selector: 'app-add-or-edit',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.scss']
})
export class AddOrEditComponent extends BaseComponent implements OnInit {

  formGroup = this.fb.group({
    stt: [null, Validators.required],
    name: [null, Validators.required],
    age: [null],
    address: [null]
  })

  constructor(injector: Injector, private testService: TestService , public activeModal: NgbActiveModal) {
    super(injector, testService);
  }

  ngOnInit(): void {
    this.formGroup.patchValue(this.data);
  }
  save(){
    this.eventClickModal.emit(CONFIRM_SAVE_MODAL);
    // this.activeModal.close(CONFIRM_SAVE_MODAL);
  }

}
