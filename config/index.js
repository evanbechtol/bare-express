let config = {
  dbUrl      : process.env.DB_URL || 'mongodb://localhost:27017/changeMe',
  env        : process.env.NODE_ENV || 'development',
  logDir     : process.env.LOGDIR || 'logs',
  port       : process.env.PORT || 3000,
  viewEngine : process.env.VIEW_ENGINE || 'html'
};

module.exports = config;
