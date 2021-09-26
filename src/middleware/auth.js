const jwt = require("jsonwebtoken");

const config = process.env;
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
  }
  return res.sendStatus(401).send({ message: "Unauthorized!" });
}

const verifyUser = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }

  try {
    const decoded = jwt.verify(token, config.JWT_KEY);
    req.user = decoded;

  } catch (err) {

    return catchError(err, res);
  }

  return next();
};

module.exports = verifyUser;