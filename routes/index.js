const routesTemplate = require( './routes-template' );

let routes = ( app ) => {
  app.use( ( req, res, next ) => {
    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE' );
    res.setHeader( 'Access-Control-Allow-Headers', 'X-Requested-With,content-type, x-access-token, authorization' );
    res.setHeader( 'Access-Control-Allow-Credentials', true );
    res.removeHeader( 'X-Powered-By' );
    next();
  } );

  app.use( '/', routesTemplate );
};

module.exports = routes;
