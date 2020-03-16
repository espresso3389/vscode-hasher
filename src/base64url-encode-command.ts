import { ICommand } from './command';
import base64url from 'base64url';

export class Base64UrlEncodeCommand implements ICommand {
  run(text: string): string {
    return base64url.encode(text);
  }
}
