import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AcMarkdownEditorComponent } from './ac-markdown-editor.component';

@NgModule({
  declarations: [AcMarkdownEditorComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [AcMarkdownEditorComponent]
})
export class AcMarkdownEditorModule { }
