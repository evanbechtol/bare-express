const bodyParser  = require( 'body-parser' ),
      config      = require( './config' ),
      express     = require( 'express' ),
      morgan      = require( 'morgan' ),
      path        = require( 'path' ),
      routes      = require( './routes' ),
      rfs         = require( 'rotating-file-stream' ),
      compression = require( 'compression' );

let fs     = require( 'fs' ),
    logDir = path.join( __dirname, config.logDir );

// Check for 'logs' directory
fs.access( logDir, ( err ) => {
  if ( err ) {
    fs.mkdirSync( logDir );
  }
} );

// Initialize express instance, and log rotation
let app             = express(),
    accessLogStream = rfs( 'access.log', {
      interval : '1d',
      path     : logDir
    } );

// Setup views and pathing
app.set( 'view engine', config.viewEngine );
app.set( 'views', path.join( __dirname, 'public' ) );

// Serve static content
app.use( express.static( path.join( __dirname, 'public' ) ) );

// Set up middleware
app.use( morgan( 'dev', { stream : accessLogStream } ) );
app.use( compression() );
app.use( bodyParser.urlencoded( {
  extended : false,
  limit    : '20mb'
} ) );
app.use( bodyParser.json( { limit : '20mb' } ) );

// Pass app to routes
routes( app );

// Start application
app.listen( config.port, () => {
  console.log( 'Now listening on', config.port );

} );
