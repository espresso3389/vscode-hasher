import {
  window,
  commands,
  ExtensionContext,
  Range,
  TextEditor,
  Selection,
} from 'vscode';
import { HashCommand } from './hash-command';
import { Base64EncodeCommand } from './base64-encode-command';
import { Base64DecodeCommand } from './base64-decode-command';
import { Base64UrlEncodeCommand } from './base64url-encode-command';
import { Base64UrlDecodeCommand } from './base64url-decode-command';
import { UriEncodeComponentCommand } from './uri-encode-component-command';
import { UriDecodeComponentCommand } from './uri-decode-component-command';
import { UuidV1Command } from './uuid-v1-command';
import { UuidV4Command } from './uuid-v4-command';
import { HtmlEntityEncodeCommand } from './html-entity-encode-command';
import { HtmlEntityDecodeCommand } from './html-entity-decode-command';
import { isNullOrUndefined } from 'util';

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand('extension.md5', () => {
      let editor = window.activeTextEditor;
      if (editor === null || editor === undefined) { return; }
      let selected = getSelectedTextAndRange(editor);
      let md5 = new HashCommand('md5');
      replaceText(editor, selected.range, md5.run(selected.text));
    })
  );

  context.subscriptions.push(
    commands.registerCommand('extension.sha1', () => {
      let editor = window.activeTextEditor;
      if (editor === null || editor === undefined) { return; }
      let selected = getSelectedTextAndRange(editor);
      let sha1 = new HashCommand('sha1');
      replaceText(editor, selected.range, sha1.run(selected.text));
    })
  );

  context.subscriptions.push(
    commands.registerCommand('extension.sha256', () => {
      let editor = window.activeTextEditor;
      if (editor === null || editor === undefined) { return; }
      let selected = getSelectedTextAndRange(editor);
      let sha1 = new HashCommand('sha256');
      replaceText(editor, selected.range, sha1.run(selected.text));
    })
  );

  context.subscriptions.push(
    commands.registerCommand('extension.sha512', () => {
      let editor = window.activeTextEditor;
      if (editor === null || editor === undefined) { return; }
      let selected = getSelectedTextAndRange(editor);
      let sha1 = new HashCommand('sha512');
      replaceText(editor, selected.range, sha1.run(selected.text));
    })
  );

  context.subscriptions.push(
    commands.registerCommand('extension.base64Encode', () => {
      let editor = window.activeTextEditor;
      if (editor === null || editor === undefined) { return; }
      let selected = getSelectedTextAndRange(editor);
      let base64Encode = new Base64EncodeCommand();
      replaceText(editor, selected.range, base64Encode.run(selected.text));
    })
  );

  context.subscriptions.push(
    commands.registerCommand('extension.base64Decode', () => {
      let editor = window.activeTextEditor;
      if (editor === null || editor === undefined) { return; }
      let selected = getSelectedTextAndRange(editor);
      let base64Decode = new Base64DecodeCommand();
      replaceText(editor, selected.range, base64Decode.run(selected.text));
    })
  );

  context.subscriptions.push(
    commands.registerCommand('extension.base64UrlEncode', () => {
      let editor = window.activeTextEditor;
      if (editor === null || editor === undefined) { return; }
      let selected = getSelectedTextAndRange(editor);
      let base64Encode = new Base64UrlEncodeCommand();
      replaceText(editor, selected.range, base64Encode.run(selected.text));
    })
  );

  context.subscriptions.push(
    commands.registerCommand('extension.base64UrlDecode', () => {
      let editor = window.activeTextEditor;
      if (editor === null || editor === undefined) { return; }
      let selected = getSelectedTextAndRange(editor);
      let base64Decode = new Base64UrlDecodeCommand();
      replaceText(editor, selected.range, base64Decode.run(selected.text));
    })
  );

  context.subscriptions.push(
    commands.registerCommand('extension.uriEncodeComponent', () => {
      let editor = window.activeTextEditor;
      if (editor === null || editor === undefined) { return; }
      let selected = getSelectedTextAndRange(editor);
      let uriEncodeComponent = new UriEncodeComponentCommand();
      replaceText(
        editor,
        selected.range,
        uriEncodeComponent.run(selected.text)
      );
    })
  );

  context.subscriptions.push(
    commands.registerCommand('extension.uriDecodeComponent', () => {
      let editor = window.activeTextEditor;
      if (editor === null || editor === undefined) { return; }
      let selected = getSelectedTextAndRange(editor);
      let uriDecodeComponent = new UriDecodeComponentCommand();
      replaceText(
        editor,
        selected.range,
        uriDecodeComponent.run(selected.text)
      );
    })
  );

  context.subscriptions.push(
    commands.registerCommand('extension.uuidV1', () => {
      let editor = window.activeTextEditor;
      if (editor === null || editor === undefined) { return; }
      let selected = getSelectedTextAndRange(editor);
      let uuidV1Command = new UuidV1Command();
      insertText(editor, uuidV1Command.run());
    })
  );

  context.subscriptions.push(
    commands.registerCommand('extension.uuidV4', () => {
      let editor = window.activeTextEditor;
      if (editor === null || editor === undefined) { return; }
      let selected = getSelectedTextAndRange(editor);
      let uuidV4Command = new UuidV4Command();
      insertText(editor, uuidV4Command.run());
    })
  );

  context.subscriptions.push(
    commands.registerCommand('extension.htmlEntityEncodeComponent', () => {
      let editor = window.activeTextEditor;
      if (editor === null || editor === undefined) { return; }
      let selected = getSelectedTextAndRange(editor);
      let htmlEntityEncodeComponent = new HtmlEntityEncodeCommand();
      replaceText(
        editor,
        selected.range,
        htmlEntityEncodeComponent.run(selected.text)
      );
    })
  );

  context.subscriptions.push(
    commands.registerCommand('extension.htmlEntityDecodeComponent', () => {
      let editor = window.activeTextEditor;
      if (editor === null || editor === undefined) { return; }
      let selected = getSelectedTextAndRange(editor);
      let htmlEntityDecodeComponent = new HtmlEntityDecodeCommand();
      replaceText(
        editor,
        selected.range,
        htmlEntityDecodeComponent.run(selected.text)
      );
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() { }

/**
 * Get selected text and range
 *
 * @param {TextEditor} editor
 */
function getSelectedTextAndRange(editor: TextEditor) {
  let selection = editor.selection;
  let range;

  if (!hasSelectedText(selection)) {
    range = editor.document.getWordRangeAtPosition(selection.active);
  } else {
    range = new Range(selection.start, selection.end);
  }

  let text = editor.document.getText(range);

  return {
    text: text,
    range: range,
  };
}

/**
 * Check if selection has selected text or just a cursor
 *
 * @param {Selection} selection
 * @return {boolean} true if not a cursor
 */
function hasSelectedText(selection: Selection) {
  return selection.start.character !== selection.end.character;
}

/**
 * Replace text in editor
 *
 * @param {TextEditor} editor
 * @param {Range} range
 * @param {string} newText - new text to replace
 */
function replaceText(editor: TextEditor, range: any, newText: string) {
  editor.edit(function (editBuilder) {
    editBuilder.replace(range, newText);
  });
}

/**
 * Insert text in editor
 */
function insertText(editor: TextEditor, text: string) {
  const position = editor.selection.active;

  editor.edit(function (editBuilder) {
    editBuilder.insert(position, text);
  });
}
