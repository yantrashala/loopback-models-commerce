module.exports = function(Category) {

  /**
   * Retrieves information about Product.
   * @param {string} categoryId Category Id
   * @callback {Function} callback Callback function
   * @param {Error|string} err Error object
   * @param {Category} result Result object
   */
  Category.tree = function(categoryId, callback) {
    // Replace the code below with your implementation.
    // Please make sure the callback is invoked.
    Category.findById(categoryId, callback);

  }
  Category.remoteMethod('tree',
    { isStatic: true,
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
    accepts:
     [ { arg: 'id',
         type: 'string',
         description: 'Category Id',
         required: true,
         http: { source: 'path' } } ],
    returns:
     [ { description: 'Successful response',
         type: 'Category',
         arg: 'data',
         root: true } ],
    http: { verb: 'get', path: '/categoryById/:id' },
    description: 'Retrieves information about Product.' }
  );
};
