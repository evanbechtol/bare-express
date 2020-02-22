/**
 * @description Determines if user is authenticated to access protected resource
 * @param req
 * @param res
 * @param next
 */
const accessProtectionMw = ( req, res, next ) => {
  if ( req.isAuthenticated ) {
    next();
  } else {
    res.status( 403 ).json( { message: "Must be logged in to continue" } );
  }
};

module.exports = { accessProtectionMw };
