import {Component, Injector, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CONFIRM_DELETE_MODAL} from '@app/app.constants';
import {BaseComponent} from '@app/core/base/base.component';

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

  confirmDelete() {
    this.activeModal.close(CONFIRM_DELETE_MODAL);
  }
}
