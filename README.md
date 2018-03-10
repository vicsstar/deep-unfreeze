# deep-unfreeze
Unfreeze a JavaScript object/array/function that has previously been frozen (and deeply frozen) with Object.freeze, by doing a copy.

## Usage

```js
import deepUnfreeze from 'deep-unfreeze';

let subject,
    result;

subject = {};

Object.freeze(subject);

// Doesn't add the property.
// subject.lorem = 'LOREM';

result = deepUnfreeze(subject);

result.lorem = 'LOREM';
```

---

```js
import deepUnfreeze from 'deep-unfreeze';

let subject,
    result;

subject = [];

Object.freeze(subject);

// Throws an error.
// subject.push('LOREM');

result = deepUnfreeze(subject);

result.push('LOREM');
```

---

```js
import deepUnfreeze from 'deep-unfreeze';

let subject,
    result;

subject = function() {
};

Object.freeze(subject);
Object.freeze(subject.prototype);

// This won't work.
// subject.prototype.sayLorem = function() { console.log('LOREM'); };
// new subject().sayLorem() // TypeError: (intermediate value).sayIpsum is not a function

result = deepUnfreeze(subject);

result.prototype.sayIpsum = function() { console.log('IPSUM'); };
// new result().sayIpsum() // "IPSUM"
```

## Download

Download using NPM:

```sh
npm install deep-unfreeze
```

## Tests

Run unit tests (install dependencies and run):

```sh
npm install && npm run test
```
