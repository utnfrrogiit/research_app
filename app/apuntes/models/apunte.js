var mongoose = require('mongoose');

var apunteSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  tags: [String],
  categorias: [{type: mongoose.Schema.Types.ObjectID, ref: 'Categorias'}],
  filePath: String,
  previewImagePath: String,
  uploadDate: Date
})
