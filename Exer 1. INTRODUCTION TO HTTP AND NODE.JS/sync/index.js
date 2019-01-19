const storage = require("./storage");

storage.put('first','firstValue');
storage.put('second','secondValue');
storage.put('third','thirdValue');
storage.put('fouth','fourthValue');
console.log(storage.getAll());
storage.update('first','updatedFirst');
console.log(storage.get('first'));
storage.del('second');
storage.save();
storage.load();
console.log(storage.getAll());