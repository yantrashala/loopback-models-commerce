
module.exports = function(Product) {



  /**
   * Retrieves information about Product.
   * @param {string} id Product Id
   * @callback {Function} callback Callback function
   * @param {Error|string} err Error object
   * @param {Product} result Result object
   */
  Product.findByProductId = function(id, callback) {
    // Replace the code below with your implementation.
    // Please make sure the callback is invoked.
      Product.findById(id, callback);

  }

  /**
   * Retrieves information about Product.
   * @param {string} searchTerm Search Term
   * @callback {Function} callback Callback function
   * @param {Error|string} err Error object
   * @param {Product} result Result object
   */
  Product.findByTerm = function(searchTerm, callback) {
    // Replace the code below with your implementation.
    // Please make sure the callback is invoked.
    var clause = {
      where: {
        shortDescription: {
          like: '%' + searchTerm + '%'
        }
      }
    };
    Product.find(clause, callback);

  }

  /**
   * Retrieves information about Product.
   * @param {string} categoryId Category Id
   * @callback {Function} callback Callback function
   * @param {Error|string} err Error object
   * @param {Product} result Result object
   */
  Product.findByCategoryId = function(categoryId, callback) {
    // Replace the code below with your implementation.
    // Please make sure the callback is invoked.
    var clause = {where: {categoryId: {like: '%' + categoryId + '%'}}};
    Product.find(clause, callback)

  }




Product.findByCategoryId = function(categoryId, callback) {
  // Replace the code below with your implementation.
  // Please make sure the callback is invoked.
  var clause = {where: {categoryId: {like: '%' + categoryId + '%'}}};
  Product.find(clause, callback)

}

Product.remoteMethod('findByProductId',
  { isStatic: true,
  consumes: [ 'application/json' ],
  produces: [ 'application/json' ],
  accepts:
   [ { arg: 'id',
       type: 'string',
       description: 'Product Id',
       required: true,
       http: { source: 'path' } } ],
  returns:
   [ { description: 'Successful response',
       type: 'Product',
       arg: 'data',
       root: true } ],
  http: { verb: 'get', path: '/:id' },
  description: 'Retrieves information about Product.' }
);

Product.remoteMethod('findByTerm',
  { isStatic: true,
  consumes: [ 'application/json' ],
  produces: [ 'application/json' ],
  accepts:
   [ { arg: 'searchTerm',
       type: 'string',
       description: 'Search Term',
       required: true,
       http: { source: 'path' } } ],
  returns:
   [ { description: 'Successful response',
       type: 'Product',
       arg: 'data',
       root: true } ],
  http: { verb: 'get', path: '/bySearchTerm/:searchTerm' },
  description: 'Retrieves information about Product.' }
);

Product.remoteMethod('findByCategoryId',
  { isStatic: true,
  consumes: [ 'application/json' ],
  produces: [ 'application/json' ],
  accepts:
   [ { arg: 'categoryId',
       type: 'string',
       description: 'Category Id',
       required: true,
       http: { source: 'path' } } ],
  returns:
   [ { description: 'Successful response',
       type: 'Product',
       arg: 'data',
       root: true } ],
  http: { verb: 'get', path: '/byCategoryId/:categoryId' },
  description: 'Retrieves information about Product.' }
);
}
