import { ICommand } from './command';

export class Base64DecodeCommand implements ICommand {
  run(text: string): string {
    return Buffer.from(text, 'base64').toString('ascii');
  }
}
