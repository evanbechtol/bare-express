const config = {
  dbUrl: process.env.DBURL || "mongodb://127.0.0.1:27017/local",
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",
  logDir: process.env.LOGDIR || "logs",
  viewEngine: process.env.VIEW_ENGINE || "html"
};

module.exports = config;
