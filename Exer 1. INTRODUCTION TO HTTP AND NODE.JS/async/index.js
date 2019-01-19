const storage = require("../async/storage");

storage.put('first','firstValue');
storage.put('second','secondValue');
storage.put('third','thirdValue');
storage.put('fouth','fourthValue');
console.log(storage.getAll());
storage.update('first','updatedFirst');
console.log(storage.get('first'));
storage.del('second');
storage.put('five','fifthValue');
storage.save();
storage.load();
