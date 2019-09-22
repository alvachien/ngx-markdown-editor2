import { Component } from '@angular/core';
import { EditorToolbarButtonEnum, IEditorConfig } from '../../projects/ac-markdown-editor/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-markdown-editor2';
  inputtedContent: string;
  contentFromChangedEvent: string;
  editorConfig: IEditorConfig = {
    toolbarItems: [
      EditorToolbarButtonEnum.bold,
      EditorToolbarButtonEnum.italic,
      EditorToolbarButtonEnum.underline,
      EditorToolbarButtonEnum.strikethrough,
      EditorToolbarButtonEnum.heading1,
      EditorToolbarButtonEnum.heading2,
      EditorToolbarButtonEnum.heading3,
      EditorToolbarButtonEnum.paragraph,
      EditorToolbarButtonEnum.quote,
      // EditorToolbarButtonEnum.orderedlist,
      // EditorToolbarButtonEnum.unorderedlist,
      EditorToolbarButtonEnum.code,
      EditorToolbarButtonEnum.math,
    ],
    paragraphSeparator: 'div'
  };

  constructor() {
    this.inputtedContent = '';
    this.contentFromChangedEvent = '';
  }

  onContentChanged(cont) {
    this.contentFromChangedEvent = cont;
  }
}
