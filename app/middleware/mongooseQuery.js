/* Usa el objeto request.query y crea tres objetos:

   request.mongooseQuery.query: Object that can be passed
   to SomeModel.find as query parameter.

   request.mongooseQuery.fields: Object that can be passed
   to SomeModel.find as field parameter.

   request.mongooseQuery.options: Object that can be passed
   to SomeModel.find as options parameter.
*/

module.exports = function (request, response, next) {
  var mongooseQuery = {};

  mongooseQuery.query = {};
  if (request.query.q) mongooseQuery.query = JSON.parse(request.query.q);
  mongooseQuery.fields = {};
  if (request.query.fields) mongooseQuery.fields = JSON.parse(request.query.fields);

  mongooseQuery.options = {};
  if (request.query.sort) mongooseQuery.options.sort = request.query.sort;
  mongooseQuery.options.limit = request.query.limit || 20;
  if (request.query.offset) mongooseQuery.options.skip = request.query.offset;

  request.mongooseQuery = mongooseQuery;
  next();
}
