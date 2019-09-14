import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AcMarkdownEditorComponent } from './ac-markdown-editor.component';

@NgModule({
  declarations: [AcMarkdownEditorComponent],
  imports: [
    FormsModule,
  ],
  exports: [AcMarkdownEditorComponent]
})
export class AcMarkdownEditorModule { }
