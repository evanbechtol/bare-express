const config         = require( '../config' ),
      routesTemplate = require( './routes-template' );

let routes = ( app ) => {
  app.use( ( req, res, next ) => {
    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE' );
    res.setHeader( 'Access-Control-Allow-Headers', 'X-Requested-With,content-type, x-access-token' );
    res.setHeader( 'Access-Control-Allow-Credentials', true );
    res.removeHeader( 'X-Powered-By' );
    next();
  } );

  // WON'T ENFORCE HTTPS
  if ( config.env === 'development' ) {
    app.use( '/', routesTemplate );
  }

  // WILL ENFORCE HTTPS
  else {
    app.use( '/', secureRequest, routesTemplate );
  }
};

// Redirect to HTTPS route equivalent
function secureRequest ( req, res, next ) {
  if ( req.headers[ 'x-forwarded-proto' ] === 'https' ) {
    return next();
  }

  res.redirect( 'https://' + req.headers.host + '/' + req.path );
}

module.exports = routes;
