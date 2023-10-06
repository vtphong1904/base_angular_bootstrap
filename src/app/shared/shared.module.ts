import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastComponent} from './components/toast/toast.component';
import {NgbPaginationModule, NgbToastModule, NgbTypeaheadModule} from "@ng-bootstrap/ng-bootstrap";
import {TableComponent} from './components/table/table.component';
import {ErrorMessageComponent} from './components/error-message/error-message.component';
import {ErrorMessageInputComponent} from './components/error-message-input/error-message-input.component';
import {ToolTipDirective} from './directives/tool-tip.directive';
import {ConfirmComponent} from './components/confirm/confirm.component';

const bootstrapModule = [
  NgbToastModule,
  NgbTypeaheadModule,
  NgbPaginationModule
]

export const directives = [
  ToolTipDirective
]


@NgModule({
  declarations: [
    ToastComponent,
    TableComponent,
    ErrorMessageComponent,
    ErrorMessageInputComponent,
    ConfirmComponent,
    ...directives,
  ],
  exports: [
    ToastComponent,
    TableComponent,
    ErrorMessageComponent,
    ErrorMessageInputComponent,
    ConfirmComponent,
    ...directives,
    ...bootstrapModule,
  ],
  imports: [
    CommonModule,
    ...bootstrapModule,
  ]
})
export class SharedModule {
}
