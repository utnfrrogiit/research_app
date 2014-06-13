var mongoose = require('mongoose');

// MODEL: APUNTE
// =============

var apunteSchema = new mongoose.Schema({
  titulo: String,
  autores: [String],
  descripcion: String,
  tags: [String],
  categorias: [{type: mongoose.Schema.Types.ObjectId, ref: 'Categoria'}],
  filePath: String,
  previewImagePath: String,
  uploadDate: Date,
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('Apunte', apunteSchema);


// MODEL: CATEGORIA
// ================

var categoriaSchema = new mongoose.Schema({
  nombre: String,
  tipo: String, // Opciones posibles son 'materia', 'anio', 'carrera'.
  parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Categoria'},
});

mongoose.model('Categoria', categoriaSchema);
