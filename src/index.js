// unfreezes a property (object) only after determining it wasn't frozen in the first place.
const unfreezeProp = (prop) => {
  return Object.isFrozen(prop) ? deepUnfreeze(prop) : prop;
};

var deepUnfreeze = (obj) => {
	if (obj !== null) {
    if(obj.constructor.name !== 'Date' &&
      !Array.isArray(obj) &&
      typeof obj !== 'function' &&
      typeof obj === 'object') {

      return Object.getOwnPropertyNames(obj).map((prop) => {
        const clonedObj = {};
        clonedObj[prop] = unfreezeProp(obj[prop]);
        return clonedObj;
      }).reduce(
        (leftObj, rightObj) => Object.assign({}, leftObj, rightObj)
      );
    } else if (Array.isArray(obj)) {
      return obj.map((item) => unfreezeProp(item));
    } else if (typeof obj === 'function') {
      const func = function() {
        obj.call(this, ...arguments);
      };
      func.prototype = Object.create(obj.prototype);
      return func;
    }
  }
  return obj;
};

module.exports = deepUnfreeze;
