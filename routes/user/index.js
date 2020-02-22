const router = require( "express" ).Router();
const { accessProtectionMw } = require( "../../middlewares/access" );

router.get( "/", accessProtectionMw, ( req, res ) => {
  res.send( { message: "Hello!", user: req.user } );
} );

module.exports = router;
