import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, AbstractControlDirective} from "@angular/forms";

@Component({
  selector: 'app-error-message-input',
  templateUrl: './error-message-input.component.html',
  styleUrls: ['./error-message-input.component.scss']
})
export class ErrorMessageInputComponent implements OnInit {

  @Input() control!: AbstractControlDirective | AbstractControl | any;
  @Input() name = 'Trường này';
  @Input() textPattern: any;

  private errorMessages: { [key: string]: any } = {
    required: (params: any, name: any) => `${name} là trường bắt buộc`,
    pattern: (params: any, name: any) => `${this.textPattern ? this.textPattern : name + ' Không đúng định dạng'}`,
    email: (params: any, name: any) => `${name} Không đúng định dạng`,
    max: (params: any, name: any) => `${name} lớn nhất là`,
    min: (params: any, name: any) => `${name} nhỏ nhất là`,
    minlength: (params: any, name: any) => `Length of ${name} can not lower than ${params.requiredLength} characters`,
    maxlength: (params: any, name: any) => `Length of ${name} can not exceed ${params.requiredLength} characters`,
    minNumber: (params: any, name: any) => `Value of ${name} can not lower than ${params.message}`,
    maxNumber: (params: any, name: any) => `Value of ${name} can not exceed ${params.message}`,
    uniqueName: (params: any, name: any) => params.message,
    mustMatch: () => `Mật khẩu không trùng khớp`
  };

  shouldShowErrors(): boolean {
    return this.control?.errors && (this.control.dirty || this.control.touched);
  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors).map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any): any {
    return this.errorMessages[type](params, this.name);
  }

  ngOnInit(): void {
  }

}
