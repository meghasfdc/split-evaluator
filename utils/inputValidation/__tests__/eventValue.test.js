const valueValidator = require('../value');

describe('value validator', () => {
  test('should return error on empty', done => {
    const expected = 'value must be null or number.';

    const result = valueValidator('');
    
    expect(result).toHaveProperty('valid', false);
    expect(result).toHaveProperty('error', expected);
    expect(result).not.toHaveProperty('value');
    done();
  });

  test('should return error on empty trim', done => {
    const expected = 'value must be null or number.';

    const result = valueValidator('  ');
    
    expect(result).toHaveProperty('valid', false);
    expect(result).toHaveProperty('error', expected);
    expect(result).not.toHaveProperty('value');
    done();
  });

  test('should return valid on undefined', done => {
    const result = valueValidator();

    expect(result).toHaveProperty('valid', true);
    expect(result).toHaveProperty('value', null);
    expect(result).not.toHaveProperty('error');
    done();
  });

  test('should return valid on number', done => {
    const result = valueValidator('1234');

    expect(result).toHaveProperty('valid', true);
    expect(result).toHaveProperty('value', 1234);
    expect(result).not.toHaveProperty('error');
    done();
  });
});
