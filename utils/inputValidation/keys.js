const trafficTypeValidator = require('./trafficType');
const keyValidator = require('./key');

const validateKeys = (maybeKeys) => {
  const error = {
    valid: false,
    error: 'keys must be a valid format.',
  };
  // eslint-disable-next-line eqeqeq
  if (maybeKeys == undefined) {
    return {
      valid: false,
      error: 'you passed null or undefined keys, keys must be a non-empty array.',
    };
  }
  try {
    const keys = JSON.parse(maybeKeys);
    if (!Array.isArray(keys)) return error;
    if (keys.length === 0) return {
      valid: false,
      error: 'There should be at least one matchingKey-trafficType element.',
    };
    const validKeys = [];

    const isInvalid = keys.some(key => {
      const trafficTypeValidation = trafficTypeValidator(key.trafficType);
      const matchingKeyValidation = keyValidator(key.matchingKey, 'matchingKey');
      const bucketingKeyValidation = key.bucketingKey !== undefined ? keyValidator(key.bucketingKey, 'bucketingKey') : { valid: true, value: null };

      console.log('trafficTypeValidation', trafficTypeValidation);
      console.log('matchingKeyValidation', matchingKeyValidation);
      console.log('bucketingKeyValidation', bucketingKeyValidation);
      
      if (!trafficTypeValidation.valid || !matchingKeyValidation.valid || !bucketingKeyValidation.valid) return true;

      validKeys.push({
        trafficType: trafficTypeValidation.value,
        matchingKey: matchingKeyValidation.value,
        bucketingKey: bucketingKeyValidation.value,
      });
    });

    console.log('isInvalid', isInvalid);

    return isInvalid ? error : {
      valid: true,
      value: validKeys,
    };
  } catch (e) {
    return error;
  }
};

module.exports = validateKeys;