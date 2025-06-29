import test from 'node:test';
import assert from 'assert';
import { getShareUrl } from '../src/utils/promptUtils';

test('removes query string and hash from url', () => {
  const url = 'https://example.com/prompt/123?query=abc#hash';
  const result = getShareUrl(url);
  assert.strictEqual(result, 'https://example.com/prompt/123');
});
