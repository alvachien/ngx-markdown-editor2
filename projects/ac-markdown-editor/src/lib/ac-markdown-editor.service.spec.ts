import { TestBed } from '@angular/core/testing';

import { AcMarkdownEditorService } from './ac-markdown-editor.service';

describe('AcMarkdownEditorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcMarkdownEditorService = TestBed.get(AcMarkdownEditorService);
    expect(service).toBeTruthy();
  });
});
