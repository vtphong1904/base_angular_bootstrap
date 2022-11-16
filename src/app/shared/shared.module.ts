import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastComponent} from './components/toast/toast.component';
import {NgbToastModule, NgbTypeaheadModule} from "@ng-bootstrap/ng-bootstrap";
import {TableComponent} from './components/table/table.component';
import {ErrorMessageComponent} from './components/error-message/error-message.component';
import {ErrorMessageInputComponent} from './components/error-message-input/error-message-input.component';
import {ToolTipDirective} from './directives/tool-tip.directive';
import {ConfirmComponent} from './components/confirm/confirm.component';

const bootstrapModule = [
  NgbToastModule
]


@NgModule({
  declarations: [
    ToastComponent,
    TableComponent,
    ErrorMessageComponent,
    ErrorMessageInputComponent,
    ToolTipDirective,
    ConfirmComponent
  ],
  exports: [
    ToastComponent,
    TableComponent,
    ErrorMessageComponent,
    ErrorMessageInputComponent,
    ConfirmComponent,
    ToolTipDirective
  ],
  imports: [
    CommonModule,
    ...bootstrapModule,
    NgbTypeaheadModule
  ]
})
export class SharedModule {
}
