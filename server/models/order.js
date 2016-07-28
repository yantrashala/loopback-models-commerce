var loopback = require('loopback');
module.exports = function(Order) {

  /**
   * Place Order.
   * @param {string} cartId Cart Id
   * @callback {Function} callback Callback function
   * @param {Error|string} err Error object
   * @param {Order} result Result object
   */
  Order.placeOrder = function(cartId, callback) {
    // Replace the code below with your implementation.
    // Please make sure the callback is invoked.
    var ctx = loopback.getCurrentContext();
    var accessToken = ctx && ctx.get('accessToken');
    var models = Order['app']['models']; //get app models ref
    var Cart = models['Cart'];
    var clause = {
        where: {
            and: [{
                userId: {
                    like: '%' + accessToken.userId + '%'
                }
            }, {
                code: {
                    like: '%' + cartId + '%'
                }
            }]
        }
    };

    Cart.find(clause, function(err,cartObj){
      Order.upsert(cartObj[0],callback);
    });

  }


  Order.remoteMethod('placeOrder',
    { isStatic: true,
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
    accepts:
     [ { arg: 'cartId',
         type: 'string',
         description: 'Cart Id',
         required: true,
         http: { source: 'header' } } ],
    returns:
     [ { description: 'Successful response',
         type: 'Order',
         arg: 'data',
         root: true } ],
    http: { verb: 'post', path: '/placeOrder' },
    description: 'Place Order.' }
  );
};
