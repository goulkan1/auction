const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let token;
  if (
    (token = req.cookies["jwt"])
    // &&    req.headers.authorization.startsWith("Bearer")
  ) {
  }

  if (!token) {
    return res.status(401).json({ error: "token missing" });
  }

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;

    next();
  } catch (ex) {
    return res.status(400).json({ error: "token invalid" });
  }
};
