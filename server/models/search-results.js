module.exports = function(SearchResults) {

  /**
   * Searches information about Product.
   * @param {string} categoryId Category ID
   * @param {string} searchTerm search Term
   * @param {Facet} facets Facet name and value
   * @callback {Function} callback Callback function
   * @param {Error|string} err Error object
   * @param {SearchResults} result Result object
   */
  SearchResults.findProducts = function(categoryId, searchTerm, facets, callback) {
    // Replace the code below with your implementation.
    // Please make sure the callback is invoked.
        var models = SearchResults['app']['models']; //get app models ref
        var productModel = models['Product']; //get product model
        var facetModel = models['Facet']; //get facet model
        var clause; //clause to fetch the data from memory
        if (productModel.dataSource.name === 'Memory') {
          console.log('1');
            //or clause to check if we need to use , searchTerm or categoryId
            clause = {
                where: {
                    or: [{
                        shortDescription: {
                            like: '%' + searchTerm + '%'
                        }
                    }, {
                        categoryId: {
                            like: '%' + categoryId + '%'
                        }
                    }]
                }
            };

            productModel.find(clause, function (err, products) {

                facetModel.find(function (err, facets) {

                    //create json object for search api and add data to it
                    var searchData = {};

                    searchData['products'] = products;
                    searchData['facets'] = facets;
                    searchData['count'] = products.length;
                    callback(null, searchData);
                });
            });
        }
  }

  SearchResults.remoteMethod('findProducts',
    { isStatic: true,
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
    accepts:
     [ { arg: 'categoryId',
         type: 'string',
         description: 'Category ID',
         required: false,
         http: { source: 'query' } },
       { arg: 'searchTerm',
         type: 'string',
         description: 'search Term',
         required: false,
         http: { source: 'query' } },
       { arg: 'facets',
         type: 'Facet',
         description: 'Facet name and value',
         http: { source: 'body' } } ],
    returns:
     [ { description: 'Successful response',
         type: 'SearchResults',
         arg: 'data',
         root: true } ],
    http: { verb: 'get', path: '/product/search/' },
    description: 'Searches information about Product.' }
  );
};
