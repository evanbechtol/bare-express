const express = require( 'express' );
const userController = require("../../controllers/Users");

let router = express.Router();

router.get( '/', userController.getUsers);

module.exports = router;
