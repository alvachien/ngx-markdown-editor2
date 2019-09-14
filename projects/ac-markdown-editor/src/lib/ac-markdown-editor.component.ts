import { Component, OnInit } from '@angular/core';
import { ACMEditor } from './ac-markdown-editor';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ac-markdown-editor',
  template: `
    <div id='acmarkeditor'>
    </div>
  `,
  styles: []
})
export class AcMarkdownEditorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const vditor = new ACMEditor('vditor', {
      counter: 100,
      height: 300,
      hint: {
        emojiPath: 'assets/images/emoji',
        emojiTail: '<a href="https://hacpai.com/settings/function" target="_blank">设置常用表情</a>',
        emoji: {
          // tslint:disable-next-line:object-literal-key-quotes
          'sd': '💔',
          // tslint:disable-next-line:object-literal-key-quotes
          'j': 'https://unpkg.com/vditor@1.3.1/dist/images/emoji/j.png',
        },
      },
      tab: '\t',
      upload: {
        accept: 'image/*,.wav',
        token: 'test',
        url: '/api/upload/editor',
        linkToImgUrl: '/api/upload/fetch',
        filename(name) {
          // ? \ / : | < > * [ ] white to -
          return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '').
            replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '').
            replace('/\\s/g', '');
        },
      },
      preview: {
        mode: 'both',
      },
    });
  }
}
