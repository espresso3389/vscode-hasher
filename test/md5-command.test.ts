import * as assert from 'assert';
import { HashCommand } from '../src/hash-command';

suite('MD5 Tests', () => {
  test('Encrypt MD5', () => {
    let command = new HashCommand('md5');
    assert.equal(command.run('message'), '78e731027d8fd50ed642340b7c9a63b3');
  });
});
