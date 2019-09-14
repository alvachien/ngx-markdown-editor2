
interface IACMETurndownRule {
  filter: string | string[] | ((node: HTMLInputElement) => boolean);

  replacement(content: string, node?: HTMLElement): string;
}

interface IACMETurndown {
  addRule(key: string, rule: IACMETurndownRule): IACMETurndown;
}


interface ILute {
  New(): ILute;

  PutEmojis(emojis: { [key: string]: string }): void;

  SetEmojiSite(emojiSite: string): void;

  MarkdownStr(error: string, text: string): string[];

  GetEmojis(): { [key: string]: string };

  FormatStr(error: string, text: string): string[];
}

declare var webkitAudioContext: {
  prototype: AudioContext
  new(contextOptions?: AudioContextOptions): AudioContext,
};

interface IACMEHTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

interface IACMEI18nLang {
  en_US: string;
  zh_CN: string;
}

interface IACMEI18n {
  en_US: { [key: string]: string };
  zh_CN: { [key: string]: string };
}

interface IACMEClasses {
  preview?: string;
}

interface IACMEUpload {
  url?: string;
  max?: number;
  linkToImgUrl?: string;
  token?: string;
  accept?: string;

  success?(editor: HTMLPreElement, msg: string): void;

  error?(msg: string): void;

  filename?(name: string): string;

  validate?(files: File[]): string | boolean;

  handler?(files: File[]): string | null;

  format?(files: File[], responseText: string): string;
}

interface IACMEMenuItem {
  name: string;
  icon?: string;
  tip?: string;
  hotkey?: string;
  suffix?: string;
  prefix?: string;
  tipPosition?: string;

  click?(): void;
}

interface IACMEToolbarItem {
  name: string;
  icon?: string;
  tip?: string;
  hotkey?: string;
  suffix?: string;
  prefix?: string;
  tipPosition?: string;

  click?(): void;
}

interface IACMEPreview {
  delay?: number;
  maxWidth?: number;
  mode?: string; // "both" | "preview" | "editor"
  url?: string;
  hljs?: {
    style?: string,
    enable?: boolean,
  };

  parse?(element: HTMLElement): void;
}

interface IACMEHintData {
  html: string;
  value: string;
}

interface IACMEHint {
  emojiTail?: string;
  delay?: number;
  emoji?: { [key: string]: string };
  emojiPath?: string;

  at?(value: string): IACMEHintData[];
}

interface IACMEResize {
  position?: string;
  enable?: boolean;

  after?(height: number): void;
}

interface IACMEPreviewOptions {
  hljsStyle?: string;
  enableHighlight?: boolean;
  customEmoji?: { [key: string]: string };
  lang?: (keyof IACMEI18nLang);
  emojiPath?: string;
}

interface IACMEOptions {
  keymap?: { [key: string]: string };
  height?: number | string;
  width?: number | string;
  placeholder?: string;
  lang?: (keyof IACMEI18nLang);
  toolbar?: Array<string | IACMEMenuItem>;
  resize?: IACMEResize;
  counter?: number;
  cache?: boolean;
  preview?: IACMEPreview;
  hint?: IACMEHint;
  upload?: IACMEUpload;
  classes?: IACMEClasses;

  tab?: string;

  input?(value: string, previewElement?: HTMLElement): void;

  focus?(value: string): void;

  blur?(value: string): void;

  esc?(value: string): void;

  ctrlEnter?(value: string): void;

  select?(value: string): void;
}

interface IACMEditor {
  id: string;
  options: IACMEOptions;
  originalInnerHTML: string;
  lute: ILute;
  toolbar?: {
    elements?: { [key: string]: HTMLElement },
  };
  preview?: {
    element: HTMLElement
    render(vditor: IACMEditor, value?: string): void,
  };
  editor?: {
    element: HTMLPreElement,
    range: Range,
  };
  counter?: {
    element: HTMLElement
    render(length: number, counter: number): void,
  };
  resize?: {
    element: HTMLElement,
  };
  hint?: {
    timeId: number
    element: HTMLUListElement
    fillEmoji(element: HTMLElement): void
    render(): void,
  };
  tip: {
    element: HTMLElement
    show(text: string, time?: number): void
    hide(): void,
  };
  upload?: {
    element: HTMLElement
    isUploading: boolean,
  };
  undo: {
    redo(vditor: IACMEditor): void
    undo(vditor: IACMEditor): void
    addToUndoStack(vditor: IACMEditor): void,
  };
}

declare class IACMEditorConstructor {

  public static codeRender(element: HTMLElement, lang?: (keyof IACMEI18nLang)): void;

  public static highlightRender(hljsStyle: string, enableHighlight: boolean, element?: HTMLElement | Document): void;

  public static mathRender(element: HTMLElement, lang?: (keyof IACMEI18nLang)): void;

  public static mermaidRender(element: HTMLElement): void;

  public static chartRender(element?: HTMLElement | Document): void;

  public static abcRender(element?: HTMLElement | Document): void;

  public static mediaRender(element: HTMLElement): void;

  public static md2html(mdText: string, options?: IACMEPreviewOptions): string;

  public static preview(element: HTMLTextAreaElement, options?: IACMEPreviewOptions): void;

  // tslint:disable-next-line:member-ordering
  public vditor: IACMEditor;

  constructor(options: IACMEOptions)

  public getValue(): string;

  public insertValue(value: string): void;

  public focus(): void;

  public blur(): void;

  public disabled(): void;

  public enable(): void;

  public setSelection(start: number, end: number): void;

  public getSelection(): string;

  public setValue(text: string): void;

  public renderPreview(value?: string): void;

  public getCursorPosition(editor: HTMLPreElement): {
    left: number,
    top: number,
  };

  public deleteValue(): void;

  public updateValue(): string;

  public isUploading(): boolean;

  public clearCache(): void;

  public disabledCache(): void;

  public enableCache(): void;

  public html2md(value: string): string;

  public getHTML(): string;

  public tip(text: string, time?: number): void;

  public setPreviewMode(mode: string): void;
}
