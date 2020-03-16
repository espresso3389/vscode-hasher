import { ICommand } from './command';
import * as crypt from 'crypto-js';

export class HashCommand implements ICommand {

  algo: string;

  constructor(algo: string) {
    this.algo = algo;
  }

  run(text: string): string {
    switch (this.algo) {
      case 'md5': return crypt.MD5(text).toString();
      case 'sha1': return crypt.SHA1(text).toString();
      case 'sha256': return crypt.SHA256(text).toString();
      case 'sha512': return crypt.SHA512(text).toString();
      default: return '<unknown>';
    }
  }
}
