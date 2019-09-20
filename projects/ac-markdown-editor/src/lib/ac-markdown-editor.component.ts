import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

export interface IEditorToolbarItem {
  command: string;
  icon: string;
  title: string;
  state: () => boolean;
  result: () => void;
}

export abstract class EditorToolbarItem implements IEditorToolbarItem {
  command: string;
  icon: string;
  title: string;
  state = () => {
    if (this.command) {
      return document.queryCommandState(this.command);
    }

    return false;
  }
  result = (value?: any) => {
    if (this.command) {
      document.execCommand(this.command, false, value);
    }
  }
}

export class EditorToolbarBold extends EditorToolbarItem {
  command = 'bold';
  icon = '<b>B</b>';
  title = 'Bold';
}
export class EditorToolbarItalic extends EditorToolbarItem {
  command = 'italic';
  icon = '<i>I</i>';
  title = 'Italic';
}
export class EditorToolbarUnderline extends EditorToolbarItem {
  command = 'underline';
  icon = '<u>U</u>';
  title = 'Underline';
}
export class EditorToolbarStrikeThrough extends EditorToolbarItem {
  command = 'strikeThrough';
  icon = '<strike>S</strike>';
  title = 'Strike-through';
}
export class EditorToolbarHeading1 extends EditorToolbarItem {
  command = 'formatBlock';
  icon = '<b>H<sub>1</sub></b>';
  title = 'Heading 1';
  result = () => {
    super.result('<h1>');
  }
}
export class EditorToolbarHeading2 extends EditorToolbarItem {
  command = 'formatBlock';
  icon = '<b>H<sub>2</sub></b>';
  title = 'Heading 2';
  result = () => {
    super.result('<h2>');
  }
}
export class EditorToolbarHeading3 extends EditorToolbarItem {
  command = 'formatBlock';
  icon = '<b>H<sub>3</sub></b>';
  title = 'Heading 3';
  result = () => {
    super.result('<h3>');
  }
}
export class EditorToolbarParagraph extends EditorToolbarItem {
  command = 'formatBlock';
  icon = '&#182;';
  title = 'Paragraph';
  result = () => {
    super.result('<p>');
  }
}
export class EditorToolbarQuote extends EditorToolbarItem {
  command = 'formatBlock';
  icon = '&#8220; &#8221';
  title = 'Quote';
  result = () => {
    super.result('<blockquote>');
  }
}
export class EditorToolbarOrderedList extends EditorToolbarItem {
  command = 'insertOrderedList';
  icon = '&#35;';
  title = 'Ordered List';
}
export class EditorToolbarUnorderedList extends EditorToolbarItem {
  command = 'insertUnorderedList';
  icon = '&#8226;';
  title = 'Unordered List';
  result = () => {
    document.execCommand(this.command);
  }
}
export class EditorToolbarCode extends EditorToolbarItem {
  command = 'formatBlock';
  icon = '&lt;/&gt;';
  title = 'Code';
  result = () => {
    super.result('<pre>');
  }
}
export class EditorToolbarHorizontalLine extends EditorToolbarItem {
  command = 'insertHorizontalRule';
  icon = '&#8213;';
  title = 'Horizontal Line';
}
export class EditorToolbarLink extends EditorToolbarItem {
  command = 'createLink';
  icon = '&#128279;';
  title = 'Link';
  result = () => {
    const url = window.prompt('Enter the link URL');
    if (url) {
      document.execCommand(this.command, false, url);
    }
  }
}
export class EditorToolbarImage extends EditorToolbarItem {
  command = 'insertImage';
  icon = '&#128247;';
  title = 'Imange';
  result = () => {
    const url = window.prompt('Enter the image URL');
    if (url) {
      document.execCommand(this.command, false, url);
    }
  }
}


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ac-markdown-editor',
  template: `
    <div #acmarkeditor>
    </div>
  `,
  styles: []
})
export class AcMarkdownEditorComponent implements OnInit {
  @ViewChild('acmarkeditor', {static: false}) editor: ElementRef;

  constructor() { }

  ngOnInit() {
    // Toolbar
    const toolbar = document.createElement('div');
    toolbar.className = classes.toolbar;
    this.editor.nativeElement.appendChild(toolbar);
    // toolbar.appendChild(this.editor.nativeElement, toolbar);

    // const content = document.createElement('div');
    // content.contentEditable = true;
    // content.className = classes.content;
    // content.oninput = ({ target: { firstChild } }) => {
    //   if (firstChild && firstChild.nodeType === 3) exec(formatBlock, `<${defaultParagraphSeparator}>`)
    //   else if (content.innerHTML === '<br>') content.innerHTML = ''
    //   settings.onChange(content.innerHTML);
    // }
    // content.onkeydown = event => {
    //   if (event.key === 'Enter' && queryCommandValue(formatBlock) === 'blockquote') {
    //     setTimeout(() => exec(formatBlock, `<${defaultParagraphSeparator}>`), 0)
    //   }
    // };
    // appendChild(settings.element, content)
  
    // actions.forEach(action => {
    //   const button = createElement('button')
    //   button.className = classes.button
    //   button.innerHTML = action.icon
    //   button.title = action.title
    //   button.setAttribute('type', 'button')
    //   button.onclick = () => action.result() && content.focus()
  
    //   if (action.state) {
    //     const handler = () => button.classList[action.state() ? 'add' : 'remove'](classes.selected)
    //     addEventListener(content, 'keyup', handler)
    //     addEventListener(content, 'mouseup', handler)
    //     addEventListener(button, 'click', handler)
    //   }
  
    //   appendChild(actionbar, button)
    // })
  
    // if (settings.styleWithCSS) exec('styleWithCSS')
    // exec(defaultParagraphSeparatorString, defaultParagraphSeparator)
  
    // return settings.element   
  }
}
