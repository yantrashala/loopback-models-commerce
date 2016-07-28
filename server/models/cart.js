var loopback = require('loopback');

module.exports = function(Cart) {


  /**
   * Create Cart.
   * @param {string} login Email
   * @callback {Function} callback Callback function
   * @param {Error|string} err Error object
   * @param {Cart} result Result object
   */
  Cart.createCart = function(callback) {
    // Replace the code below with your implementation.
    // Please make sure the callback is invoked.
    var ctx = loopback.getCurrentContext();
    var accessToken = ctx && ctx.get('accessToken');
    var carObj = new Cart();
    carObj.userId= accessToken.userId;
    Cart.create(carObj,callback);

  }

  /**
   * Add to Cart.
   * @param {string} code Cart Code
   * @param {OrderEntry} entries undefined
   * @callback {Function} callback Callback function
   * @param {Error|string} err Error object
   * @param {Cart} result Result object
   */
  Cart.addToCart = function(code, entries, callback) {
    // Replace the code below with your implementation.
    // Please make sure the callback is invoked.
    var ctx = loopback.getCurrentContext();
    var accessToken = ctx && ctx.get('accessToken');

    var clause = {
        where: {
            and: [{
                userId: {
                    like: '%' + accessToken.userId + '%'
                }
            }, {
                code: {
                    like: '%' + code + '%'
                }
            }]
        }
    };

    Cart.find(clause, function(err,cartObj){
      cartObj[0].entries = entries;
      Cart.upsert(cartObj[0],callback);
    });



  }

  /**
   * Update cart with Payment Details.
   * @param {string} code Cart Code
   * @param {PaymentDetails} paymentDetails undefined
   * @callback {Function} callback Callback function
   * @param {Error|string} err Error object
   * @param {Cart} result Result object
   */
  Cart.addPaymentDetails = function(code, paymentDetails, callback) {
    // Replace the code below with your implementation.
    // Please make sure the callback is invoked.
    var ctx = loopback.getCurrentContext();
    var accessToken = ctx && ctx.get('accessToken');

    var clause = {
        where: {
            and: [{
                userId: {
                    like: '%' + accessToken.userId + '%'
                }
            }, {
                code: {
                    like: '%' + code + '%'
                }
            }]
        }
    };

    Cart.find(clause, function(err,cartObj){
      cartObj[0].paymentDetails = paymentDetails;
      Cart.upsert(cartObj[0],callback);
    });

  }

  /**
   * Add Shipping Address.
   * @param {string} code Cart Code
   * @param {Address} deliveryAddress undefined
   * @callback {Function} callback Callback function
   * @param {Error|string} err Error object
   * @param {Cart} result Result object
   */
  Cart.addShippingAddress = function(code, deliveryAddress, callback) {
    // Replace the code below with your implementation.
    // Please make sure the callback is invoked.
    var ctx = loopback.getCurrentContext();
    var accessToken = ctx && ctx.get('accessToken');

    var clause = {
        where: {
            and: [{
                userId: {
                    like: '%' + accessToken.userId + '%'
                }
            }, {
                code: {
                    like: '%' + code + '%'
                }
            }]
        }
    };

    Cart.find(clause, function(err,cartObj){
      cartObj[0].deliveryAddress = deliveryAddress;
      Cart.upsert(cartObj[0],callback);
    });

  }
  Cart.remoteMethod('createCart',
    { isStatic: true,
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
    returns:
     [ { description: 'Successful response',
         type: 'Cart',
         arg: 'data',
         root: true } ],
    http: { verb: 'post', path: '/' },
    description: 'Create Cart.' }
  );

  Cart.remoteMethod('addToCart',
    { isStatic: true,
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
    accepts:
     [ { arg: 'code',
         type: 'string',
         description: 'Cart Code',
         required: true,
         http: { source: 'query' } },
       { arg: 'entries',
         type: 'OrderEntry',
         description: 'OrderEntry',
         required: true,
         http: { source: 'body' } } ],
    returns:
     [ { description: 'Successful response',
         type: 'Cart',
         arg: 'data',
         root: true } ],
    http: { verb: 'put', path: '/addToCart' },
    description: 'Add to Cart.' }
  );

  Cart.remoteMethod('addPaymentDetails',
    { isStatic: true,
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
    accepts:
     [ { arg: 'code',
         type: 'string',
         description: 'Cart Code',
         required: true,
         http: { source: 'query' } },
       { arg: 'paymentDetails',
         type: 'PaymentDetails',
         description: 'PaymentDetails',
         required: true,
         http: { source: 'body' } } ],
    returns:
     [ { description: 'Successful response',
         type: 'Cart',
         arg: 'data',
         root: true } ],
    http: { verb: 'put', path: '/paymentDetails' },
    description: 'Update cart with Payment Details.' }
  );

  Cart.remoteMethod('addShippingAddress',
    { isStatic: true,
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
    accepts:
     [ { arg: 'code',
         type: 'string',
         description: 'Cart Code',
         required: true,
         http: { source: 'query' } },
       { arg: 'deliveryAddress',
         type: 'Address',
         description: undefined,
         required: undefined,
         http: { source: 'body' } } ],
    returns:
     [ { description: 'Successful response',
         type: 'Cart',
         arg: 'data',
         root: true } ],
    http: { verb: 'put', path: '/shippingAddress' },
    description: 'Add Shipping Address.' }
  );
};
