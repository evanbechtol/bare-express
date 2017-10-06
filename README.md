# Bare Express Web Server
A basic scaffold/skeleton to create a Node.JS Express server.

### Contributing
If you wish to contribute to this repository, please feel free to clone/fork.
Issue Pull Requests or open issues for any changes that you make.

### Functionality
* HTTP(S) Request Logging
* Rotating log system
* Enforcement of HTTPS usage in production environments
* Compression of responses
* Configurable application variables
* REST-ful API setup

### Future Functionality
All future functionality will branch off of master; the master branch will always be
a simple "scaffold" express server. The other branches will contain additional functionality.

* MongoDB support: Connect and interact with Mongo DB's through [Mongoose](http://mongoosejs.com/)
* SQL DB support: Connect and interact with SQL DB's through [Sequelize](http://docs.sequelizejs.com/)
* Passport: Implement authentication and authorization strategies with [Passport](http://passportjs.org/) 

### Setup
- Simply clone the repo
```git clone https://github.com/Parasin/bare-express.git```

- Install the dependencies 
   - Install [Node.JS](https://nodejs.org/en/)
   - Install application dependencies ```npm install```

- Add the routes you need under the `routes` directory, and include require them in your `routes/index.js` file.
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

- Create the models required for your database, in the models directory.  
- Create controllers to handle, and modularize complex operations.
 
### Starting 
* Run the command ```npm test``` to run the application in "development" mode.
* Run the command ```npm start``` to run the application in "production" mode.
