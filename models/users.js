const mongoose = require( 'mongoose' );

const userSchema = mongoose.Schema( {
  username: {
    type: String,
    required: true
  },

  googleId: {
    type: String
  }
} );

module.exports = mongoose.model( 'User', userSchema );
