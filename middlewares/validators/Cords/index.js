const resMw = require( "../../response" );
const Messages = require( "../../../config/messages" );
const ObjectId = require( "mongoose" ).Types.ObjectId;

module.exports = {
  bodyIsPresent,
  fileIsPresent,
  idIsPresent,
  statusIsPresent,
  userIsPresent
};

/**
 * @description Validate that an ID was provided and that it is valid
 * @param req {object} Express MW
 * @param res {object} Express MW
 * @param next {function} Express MW
 */
function idIsPresent ( req, res, next ) {
  const id = req.query.id || req.params.id || null;

  if ( id && typeof id === "string" && ObjectId.isValid( id ) ) {
    req.id = id;
    next();
  } else {
    res.status( 400 ).send( resMw.sendError( Messages.responses.idNotProvided ) );
  }
}

/**
 * @description Validate that an Status was provided and that it is valid
 * @param req {object} Express MW
 * @param res {object} Express MW
 * @param next {function} Express MW
 */
function statusIsPresent ( req, res, next ) {
  const status = req.query.status || req.params.status || null;

  if ( status && typeof status === "string" && status.length > 0 ) {
    req.status = status;
    next();
  } else {
    res.status( 400 ).send( resMw.sendError( Messages.responses.statusNotProvided ) );
  }
}

/**
 * @description Validate that a body was provided and that it is valid
 * @param req {object} Express MW
 * @param res {object} Express MW
 * @param next {function} Express MW
 */
function bodyIsPresent ( req, res, next ) {
  const isValid = req.body
    && typeof req.body === "object"
    && Object.keys( req.body ).length > 0;

  if ( isValid ) {
    next();
  } else {
    res.status( 400 ).send( resMw.sendError( Messages.responses.bodyNotProvided ) );
  }
}

/**
 * @description Validate that user is present and valid
 * @param req {object} Express MW
 * @param res {object} Express MW
 * @param next {function} Express MW
 */
function userIsPresent ( req, res, next ) {
  let user = req.query.user || req.params.user || null;

  if ( user ) {
    try {
      user = JSON.parse( user );

      if ( user._id && user.username ) {
        req.user = user;
        next();
      } else {
        res.status( 400 ).send( resMw.sendError( Messages.responses.userNotProvided ) );
      }

    } catch ( e ) {
      return res.status( 500 ).send( resMw.sendError( Messages.responses.errorParsingObject ) );
    }
  } else {
    res.status( 400 ).send( resMw.sendError( Messages.responses.userNotProvided ) );
  }
}

/**
 * @description Validate that file is present and valid
 * @param req {object} Express MW
 * @param res {object} Express MW
 * @param next {function} Express MW
 */
function fileIsPresent ( req, res, next ) {
  if ( req.file ) {
    next();
  } else {
    res.status( 400 ).send( resMw.sendError( Messages.responses.userNotProvided ) );
  }
}
