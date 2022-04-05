module.exports = {
  400: "Bad request",
  403: "Unauthorized",
  404: "Not found",
  500: "Server Error",
  responses: {
    appTokenNotProvided: "appToken must be included in" +
      " querystring/params/body for request",
    errorParsingObject: "Invalid JSON object provided",
    fileNotProvided: "Valid file not provided",
    idNotProvided: "Valid request ID not provided",
    bodyNotProvided: "Valid request body not provided",
    statusNotProvided: "Valid status not provided",
    userNotProvided: "Valid user not provided"
  }
};
