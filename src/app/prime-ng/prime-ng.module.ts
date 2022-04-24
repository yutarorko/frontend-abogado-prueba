import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//primeNg
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {MenubarModule} from 'primeng/menubar';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {InputTextModule} from 'primeng/inputtext';
import {RippleModule} from 'primeng/ripple';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { SplitButtonModule } from 'primeng/splitbutton';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import { CascadeSelectModule } from "primeng/cascadeselect";
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { TagModule } from 'primeng/tag';
import {PasswordModule} from 'primeng/password';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';



@NgModule({
  declarations: [],
  exports: [
    SplitButtonModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    CardModule,
    MenubarModule,
    InputTextModule,
    RippleModule,
    BrowserAnimationsModule,
    BrowserModule,
    CheckboxModule,
    RadioButtonModule,
    FormsModule,
    ToastModule,
    CalendarModule,
    CascadeSelectModule,
    DropdownModule,
    InputTextareaModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    MessagesModule,
    MessageModule,
    TagModule,
    PasswordModule
  ]
})
export class PrimeNgModule { }
