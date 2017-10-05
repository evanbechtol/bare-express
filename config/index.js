let config = {
  port   : process.env.PORT || 3000,
  env    : process.env.NODE_ENV || 'development',
  logDir : process.env.LOGDIR || 'logs'
};

module.exports = config;
