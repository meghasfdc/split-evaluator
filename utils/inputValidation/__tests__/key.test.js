const keyValidator = require('../key');


describe('key validator', () => {
  test('should return error on undefined', async (done) => {
    const expected = 'you passed a null or undefined key, key must be a non-empty string.';

    const result = keyValidator(null, 'key');

    expect(result).toHaveProperty('valid', false);
    expect(result).toHaveProperty('error', expected);
    expect(result).not.toHaveProperty('value');
    done();
  });

  test('should return error on empty', async (done) => {
    const expected = 'you passed an empty string, key must be a non-empty string.';

    const result = keyValidator('', 'key');

    expect(result).toHaveProperty('valid', false);
    expect(result).toHaveProperty('error', expected);
    expect(result).not.toHaveProperty('value');
    done();
  });

  test('should return error on trim', async (done) => {
    const expected = 'you passed an empty string, key must be a non-empty string.';

    const result = keyValidator('   ', 'key');

    expect(result).toHaveProperty('valid', false);
    expect(result).toHaveProperty('error', expected);
    expect(result).not.toHaveProperty('value');
    done();
  });

  test('should return error when key is too long', async (done) => {
    let keyInput = '';
    for (let i = 0; i <= 250; i++) {
      keyInput += 'a';
    }
    const expected = 'key too long, key must be 250 characters or less.';

    const result = keyValidator(keyInput, 'key');

    expect(result).toHaveProperty('valid', false);
    expect(result).toHaveProperty('error', expected);
    expect(result).not.toHaveProperty('value');
    done();
  });

  test('should be valid when ok', async (done) => {
    const result = keyValidator('key', 'key');

    expect(result).toHaveProperty('valid', true);
    expect(result).toHaveProperty('value', 'key');
    expect(result).not.toHaveProperty('error');
    done();
  });

  test('should be valid when ok and should trim', async (done) => {
    const result = keyValidator('   key ', 'key');

    expect(result).toHaveProperty('valid', true);
    expect(result).toHaveProperty('value', 'key');
    expect(result).not.toHaveProperty('error');
    done();
  });
});
