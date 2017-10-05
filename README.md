# Bare Express Web Server
A basic scaffold/skeleton to create a Node.JS Express server.

### Functionality
* HTTP(S) Request Logging
* Rotating log system
* Enforcement of HTTPS usage in production environments
* Compression of responses
* Configurable application variables
* REST-ful API setup

### Setup
Simply clone the repo
```git clone https://github.com/Parasin/bare-express.git```

Install the dependencies ```npm install```

Add the routes you need under the `routes` directory, and include require them in your `routes/index.js` file.
```
| routes/
| index.js
|
|---> user/
     |---> index.js
|
|---> auth/
     |---> index.js
```

```
//FILE: routes/index.js
const user = require( './user' );

// WON'T ENFORCE HTTPS
  if ( config.env === 'development' ) {
     app.use( '/user', user );
  }

  // WILL ENFORCE HTTPS
  else {
     app.use( '/user', user );
  }
```

### Starting 
* Run the command ```npm test``` to run the application in "development" mode.
* Run the command ```npm start``` to run the application in "production" mode.
