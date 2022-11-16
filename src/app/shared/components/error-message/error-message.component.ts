import {Component, Input, OnInit, Optional} from '@angular/core';
import {AbstractControl, ControlContainer, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  @Input() controlName: string | undefined;
  @Input() name: string = 'Trường này';
  @Input() valid: any;
  errorMessage = {
    required: (name: any, error: any) => `${name} là trường bắt buộc`,
    maxlength: (name: any, error: any) => `${name} có tối đa ${this.valid ? this.valid : error.maxlength.requiredLength} ký tự`,
    pattern: (name: any, error: any) => `${name} không đúng định dạng ${this.valid ? this.valid : error.pattern.requiredPattern}`,
    min: (name: any, error: any) => `${name} nhỏ nhất là `,
  };

  constructor(@Optional() private controlContainer: ControlContainer) {
  }

  get form(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }

  get control(): FormControl {
    // @ts-ignore
    return this.form.get(this.controlName) as FormControl;
  }

  get getListError() {
    return Object.keys(this.errorMessage).map((item: any) => {
      if (this.control.hasError(item)) {
        return this.errorMessage[item](this.name, this.control.errors);
      }
    });
  }

  ngOnInit(): void {
  }

}

// @ts-ignore
export function isCustomValid(control?: AbstractControl): Validators {
  console.log(control?.value)
}
