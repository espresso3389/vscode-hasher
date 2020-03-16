import { ICommand } from './command';

export class Base64EncodeCommand implements ICommand {
  run(text: string): string {
    return Buffer.from(text).toString('base64');
  }
}
