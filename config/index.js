let config = {
  dbUrl: process.env.DBURL || "mongodb://localhost/test-db",
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",
  logDir: process.env.LOGDIR || "logs",
  viewEngine: process.env.VIEW_ENGINE || "html",
  googleConsumerKey: process.env.GOOGLE_CONSUMER_KEY,
  googleConsumerSecret: process.env.GOOGLE_CONSUMER_SECRET
};

module.exports = config;
