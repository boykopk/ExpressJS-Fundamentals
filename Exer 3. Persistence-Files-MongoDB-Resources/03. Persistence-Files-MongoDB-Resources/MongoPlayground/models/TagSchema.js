const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let tagSchema = new Schema({
  name: { type: String, required: true },
  creationDate: { type: Date, required: true, default: Date.now },
  images: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Image' }],
});

tagSchema.methods.toLowerCase = function () {
  return this.name = name.toLowerCase();
};

let Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;