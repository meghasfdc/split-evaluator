const splitValidator = require('../split');

describe('split validator', () => {
  test('should return error on undefined', done => {
    const expected = 'you passed a null or undefined split-name, split-name must be a non-empty string.';

    const result = splitValidator();

    expect(result).toHaveProperty('valid', false);
    expect(result).toHaveProperty('error', expected);
    expect(result).not.toHaveProperty('value');
    done();
  });

  test('should return error on empty', done => {
    const expected = 'you passed an empty split-name, split-name must be a non-empty string.';

    const result = splitValidator('');
    
    expect(result).toHaveProperty('valid', false);
    expect(result).toHaveProperty('error', expected);
    expect(result).not.toHaveProperty('value');
    done();
  });

  test('should return error on trim', done => {
    const expected = 'you passed an empty split-name, split-name must be a non-empty string.';

    const result = splitValidator('  ');
    
    expect(result).toHaveProperty('valid', false);
    expect(result).toHaveProperty('error', expected);
    expect(result).not.toHaveProperty('value');
    done();
  });

  test('should be valid when ok', done => {
    const result = splitValidator('my-split');
    
    expect(result).toHaveProperty('valid', true);
    expect(result).toHaveProperty('value', 'my-split');
    expect(result).not.toHaveProperty('error');
    done();
  });

  test('should be valid when ok and should trim', done => {
    const result = splitValidator(' my-split     ');
    
    expect(result).toHaveProperty('valid', true);
    expect(result).toHaveProperty('value', 'my-split');
    expect(result).not.toHaveProperty('error');
    done();
  });
});
