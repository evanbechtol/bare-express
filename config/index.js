let config = {
  dbUrl: process.env.DBURL || "mongodb://localhost/test-db",
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",
  logDir: process.env.LOGDIR || "logs",
  viewEngine: process.env.VIEW_ENGINE || "html",
  googleConsumerKey: process.env.GOOGLE_CONSUMER_KEY,
  googleConsumerSecret: process.env.GOOGLE_CONSUMER_SECRET,
  facebookAppId: process.env.FACEBOOK_APP_ID,
  facebookAppSecret: process.env.FACEBOOK_APP_SECRET,
  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  session: {
    cookieKey: "y_nb89!R43qvB598t&134n43g12%"
  }
};

module.exports = config;
