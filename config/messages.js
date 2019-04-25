module.exports = {
  400: "",
  403: "",
  404: "",
  500: "",
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
