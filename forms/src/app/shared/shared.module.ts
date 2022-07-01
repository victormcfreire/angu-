import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { DropdownService } from './services/dropdown.service';
import { InputFieldComponent } from './input-field/input-field.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { FormsModule } from '@angular/forms';
import { BaseFormComponent } from './base-form/base-form.component';



@NgModule({
  declarations: [
    FormDebugComponent,
    InputFieldComponent,
    ErrorMsgComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    FormDebugComponent,
    InputFieldComponent,
    ErrorMsgComponent
  ],
  providers: [
    DropdownService
  ]
})
export class SharedModule { }
