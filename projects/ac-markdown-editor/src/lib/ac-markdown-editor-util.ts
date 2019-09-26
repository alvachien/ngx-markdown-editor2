
export function code160to32(text: string) {
  // 非打断空格转换为空格
  return text.replace(/\u00a0/g, ' ');
}

export function getText(element: HTMLElement) {
  // last char must be a `\n`.
  return code160to32(`${element.textContent}\n`.replace(/\n\n$/, '\n'));
}

export function selectIsEditor(editor: HTMLElement, range?: Range) {
  let isEditor = false;
  if (!range) {
      if (window.getSelection().rangeCount === 0) {
          return isEditor;
      } else {
          range = window.getSelection().getRangeAt(0);
      }
  }
  let container = range.commonAncestorContainer;
  while (container) {
      if (editor.isEqualNode(container)) {
          isEditor = true;
          container = undefined;
      }
      if (container) {
          if (container.nodeName === 'BODY') {
              container = undefined;
          } else {
              container = container.parentElement;
          }
      }
  }
  return isEditor;
}

// export function inputEvent(vditor: IVditor, addUndo: boolean = true) {
//   if (vditor.options.counter > 0) {
//       vditor.counter.render(getText(vditor.editor.element).length, vditor.options.counter);
//   }
//   if (typeof vditor.options.input === "function") {
//       vditor.options.input(getText(vditor.editor.element), vditor.preview && vditor.preview.element);
//   }
//   if (vditor.hint) {
//       vditor.hint.render(vditor);
//   }
//   if (vditor.options.cache) {
//       localStorage.setItem(`vditor${vditor.id}`, getText(vditor.editor.element));
//   }
//   if (vditor.preview) {
//       vditor.preview.render(vditor);
//   }
//   if (addUndo) {
//       vditor.undo.addToUndoStack(vditor);
//   }

//   if (vditor.devtools) {
//       vditor.devtools.renderEchart(vditor);
//   }
// }

export function formatRender(vditor: IVditor, content: string, position?: { start: number, end: number },
  addUndo: boolean = true) {

  const textList = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  let html = "";
  const newLine = '<span><br><span style="display: none">\n</span></span>';
  textList.forEach((text, index) => {
    if (index === textList.length - 1 && text === "") {
      return;
    }
    if (text) {
      html += `<span>${code160to32(text.replace(/&/g, "&amp;").replace(/</g, "&lt;"))}</span>${newLine}`;
    } else {
      html += newLine;
    }
  });

  // TODO: 使用虚拟 Dom
  vditor.editor.element.innerHTML = html || newLine;

  if (position) {
    setSelectionByPosition(position.start, position.end, vditor.editor.element);
  }

  inputEvent(vditor, addUndo);
}

export function insertText(vditor: IVditor, prefix: string, suffix: string, replace: boolean = false,
  toggle: boolean = false) {
  let range: Range = window.getSelection().rangeCount === 0 ? undefined : window.getSelection().getRangeAt(0);
  if (!selectIsEditor(vditor.editor.element)) {
    if (vditor.editor.range) {
      range = vditor.editor.range;
    } else {
      range = vditor.editor.element.ownerDocument.createRange();
      range.setStart(vditor.editor.element, 0);
      range.collapse(true);
    }
  }

  const position = getSelectPosition(vditor.editor.element, range);
  const content = getText(vditor.editor.element);

  // select none || select something and need replace
  if (range.collapsed || (!range.collapsed && replace)) {
    const text = prefix + suffix;
    formatRender(vditor, content.substring(0, position.start) + text + content.substring(position.end),
      {
        end: position.start + prefix.length,
        start: position.start + prefix.length,
      });
  } else {
    const selectText = content.substring(position.start, position.end);
    if (toggle && content.substring(position.start - prefix.length, position.start) === prefix
      && content.substring(position.end, position.end + suffix.length) === suffix) {
      formatRender(vditor, content.substring(0, position.start - prefix.length)
        + selectText + content.substring(position.end + suffix.length),
        {
          end: position.start - prefix.length + selectText.length,
          start: position.start - prefix.length,
        });
    } else {
      const text = prefix + selectText + suffix;
      formatRender(vditor, content.substring(0, position.start) + text + content.substring(position.end),
        {
          end: position.start + prefix.length + selectText.length,
          start: position.start + prefix.length,
        });
    }
  }
}
