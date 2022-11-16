import {Component, Injector, OnInit} from '@angular/core';
import {BaseComponent} from "../../../core/base/base.component";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CONFIRM_DELETE_MODAL} from "../../../app.constants";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent extends BaseComponent implements OnInit {

  constructor(injector: Injector, public activeModal: NgbActiveModal) {
    super(injector)
  }

  ngOnInit(): void {
  }

  delete() {
    this.eventClickModal.emit('delete');
    this.activeModal.close(CONFIRM_DELETE_MODAL);
  }
}
