import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy, forwardRef, HostListener, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, FormControl,
  Validator, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import * as katex from 'katex';

// Constants for commands
const commandFormatBlock = 'formatBlock';
const commandParagraphSeparator = 'defaultParagraphSeparator';

// Enum for toolbar buttons
export enum EditorToolbarButtonEnum {
  bold = 'bold',
  italic = 'italic',
  underline = 'underline',
  strikethrough = 'strikethrough',
  heading1 = 'heading1',
  heading2 = 'heading2',
  heading3 = 'heading3',
  paragraph = 'paragraph',
  quote = 'quote',
  orderedlist = 'orderedlist',
  unorderedlist = 'unorderedlist',
  code = 'code',
  horizontalline = 'horizontalline',
  link = 'link',
  image = 'image',
  math = 'math'
}

// Config for editor
export interface IEditorConfig {
  toolbarItems?: EditorToolbarButtonEnum[];
  paragraphSeparator?: string;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ac-markdown-editor',
  templateUrl: './ac-markdown-editor.component.html',
  styleUrls: ['./ac-markdown-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AcMarkdownEditorComponent),
      multi: true,
    }, {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AcMarkdownEditorComponent),
      multi: true,
    },
  ],
})
export class AcMarkdownEditorComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {
  @ViewChild('aceditor', {static: true}) erWrapper: ElementRef;
  @ViewChild('aceditor_toolbar', {static: true}) erToolbar: ElementRef;
  @ViewChild('aceditor_content', {static: true}) erContent: ElementRef;
  @Input() config: IEditorConfig;
  @Output() contentChanged: EventEmitter<string> = new EventEmitter();

  isDialogMathOpen = false;
  mathDialogInput: string;
  // tslint:disable-next-line:variable-name
  private _onChange: (val: any) => void;
  // tslint:disable-next-line:variable-name
  private _onTouched: () => void;

  defaultToolbarItems: EditorToolbarButtonEnum[] = [
    EditorToolbarButtonEnum.bold,
    EditorToolbarButtonEnum.italic,
    EditorToolbarButtonEnum.underline,
    EditorToolbarButtonEnum.strikethrough,
    EditorToolbarButtonEnum.heading1,
    EditorToolbarButtonEnum.heading2,
    EditorToolbarButtonEnum.heading3,
    EditorToolbarButtonEnum.paragraph,
    EditorToolbarButtonEnum.quote,
    EditorToolbarButtonEnum.orderedlist,
    EditorToolbarButtonEnum.unorderedlist,
    EditorToolbarButtonEnum.code,
    EditorToolbarButtonEnum.horizontalline,
    EditorToolbarButtonEnum.link,
    EditorToolbarButtonEnum.image,
    EditorToolbarButtonEnum.math,
  ];
  toolbarItems: EditorToolbarButtonEnum[] = [];
  paragraphSeparator = 'div';

  // @HostListener('change') onChange(): void {
  //   if (this._onChange) {
  //     this._onChange(this.erContent.nativeElement.innerHTML);
  //   }
  // }
  // @HostListener('blur') onTouched(): void {
  //   if (this._onTouched) {
  //     this._onTouched();
  //   }
  // }

  public isToolbarItemExist(item: string): boolean {
    return this.toolbarItems.some((searchElement: EditorToolbarButtonEnum) => {
      return searchElement === (item as EditorToolbarButtonEnum);
    });
  }

  public isToolbarButtonStatus(item: string): boolean {
    const btn = item as EditorToolbarButtonEnum;
    let rst = false;
    switch (btn) {
      case EditorToolbarButtonEnum.bold:
        rst = document.queryCommandState('bold');
        break;
      case EditorToolbarButtonEnum.italic:
        rst = document.queryCommandState('italic');
        break;
      case EditorToolbarButtonEnum.underline:
        rst = document.queryCommandState('underline');
        break;
      case EditorToolbarButtonEnum.strikethrough:
        rst = document.queryCommandState('strikeThrough');
        break;

      default:
        break;
    }

    return rst;
  }

  constructor() {
    // Empty
  }

  ngOnInit() {
    this.toolbarItems = [];
    if (this.config && this.config.toolbarItems) {
      this.config.toolbarItems.forEach((value: EditorToolbarButtonEnum) => {
        this.toolbarItems.push(value);
      });
    } else {
      this.toolbarItems.push(...this.defaultToolbarItems);
    }
    if (this.config  && this.config.paragraphSeparator) {
      this.paragraphSeparator = this.config.paragraphSeparator;
    }
    document.execCommand(commandParagraphSeparator, false, this.paragraphSeparator);
  }
  ngOnDestroy() {
    this.toolbarItems = [];
    this.paragraphSeparator = 'div';
  }

  writeValue(val: any): void {
    this.erContent.nativeElement.innerHTML = val as string;
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.erWrapper.nativeElement.disable = true;
    } else {
      this.erWrapper.nativeElement.disable = true;
    }
  }

  onToolbarButtonClick(event: MouseEvent, btn: string): void {
    const titem: EditorToolbarButtonEnum = btn as EditorToolbarButtonEnum;
    switch (titem) {
      case EditorToolbarButtonEnum.bold:
        document.execCommand('bold', false);
        this.erContent.nativeElement.focus();
        break;

      case EditorToolbarButtonEnum.italic:
        document.execCommand('italic', false);
        this.erContent.nativeElement.focus();
        break;

      case EditorToolbarButtonEnum.underline:
        document.execCommand('underline', false);
        this.erContent.nativeElement.focus();
        break;

      case EditorToolbarButtonEnum.strikethrough:
        document.execCommand('strikeThrough', false);
        this.erContent.nativeElement.focus();
        break;
      case EditorToolbarButtonEnum.heading1:
        document.execCommand(commandFormatBlock, false, '<h1>');
        this.erContent.nativeElement.focus();
        break;
      case EditorToolbarButtonEnum.heading2:
        document.execCommand(commandFormatBlock, false, '<h2>');
        this.erContent.nativeElement.focus();
        break;
      case EditorToolbarButtonEnum.heading3:
        document.execCommand(commandFormatBlock, false, '<h3>');
        this.erContent.nativeElement.focus();
        break;
      case EditorToolbarButtonEnum.paragraph:
        document.execCommand(commandFormatBlock, false, '<p>');
        this.erContent.nativeElement.focus();
        break;
      case EditorToolbarButtonEnum.quote:
        document.execCommand(commandFormatBlock, false, '<blockquote>');
        this.erContent.nativeElement.focus();
        break;
      case EditorToolbarButtonEnum.orderedlist:
        document.execCommand('insertOrderedList', false);
        this.erContent.nativeElement.focus();
        break;
      case EditorToolbarButtonEnum.unorderedlist:
        document.execCommand('insertUnorderedList', false);
        this.erContent.nativeElement.focus();
        break;
      case EditorToolbarButtonEnum.code:
        document.execCommand(commandFormatBlock, false, '<pre>');
        this.erContent.nativeElement.focus();
        break;
      case EditorToolbarButtonEnum.horizontalline:
        document.execCommand('insertHorizontalRule', false);
        this.erContent.nativeElement.focus();
        break;
      case EditorToolbarButtonEnum.link:
      case EditorToolbarButtonEnum.image:
        // TBD.
        this.erContent.nativeElement.focus();
        break;
      case EditorToolbarButtonEnum.math:
        this.isDialogMathOpen = true;
        this.erContent.nativeElement.focus();
        break;

      default:
        break;
    }
  }

  onContentKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && document.queryCommandValue(commandFormatBlock) === 'blockquote') {
      setTimeout(() => {
        document.execCommand(commandFormatBlock, false, `${this.paragraphSeparator}`);
      }, 0);
    }
  }
  onContentInput(event): void {
    const targetElement: HTMLDivElement = event.target as HTMLDivElement;
    if (targetElement && targetElement.firstChild && targetElement.firstChild.nodeType === 3) {
      document.execCommand(commandFormatBlock, false, `${this.paragraphSeparator}`);
    } else if (this.erContent.nativeElement.innerHTML === '<br>') {
      this.erContent.nativeElement.innerHTML = '';
    }

    this.contentChanged.emit(this.erContent.nativeElement.innerText);
  }

  // Math dialog
  onMathDialogInput(event): void {
    // Math dialog
    if (event) {
      const dialogelem: HTMLElement = document.getElementById('acme_math_dialog');
      const inputelem = dialogelem.getElementsByClassName('acme_math_input')[0] as HTMLDivElement;
      const previewelem = dialogelem.getElementsByClassName('acme_math_preview')[0] as HTMLDivElement;
      if (inputelem.innerText) {
        // const orginput = '$$' + inputelem.innerText + '$$';
        const orginput = inputelem.innerText;
        katex.render(orginput, previewelem);
      }
    }
  }
  onMathDialogClose(): void {
    const dialogelem: HTMLElement = document.getElementById('acme_math_dialog');
    const inputelem = dialogelem.getElementsByClassName('acme_math_input')[0] as HTMLDivElement;
    if (inputelem.innerText) {
      const newelem: HTMLElement = document.createElement(this.paragraphSeparator);
      katex.render(inputelem.innerText, newelem);
      this.erContent.nativeElement.appendChild(newelem);
    }

    this.isDialogMathOpen = false;
  }
  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    // throw new Error("Method not implemented.");
  }
}
