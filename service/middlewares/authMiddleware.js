const jwt = require("jsonwebtoken");

function extractTokenFromHeader(req) {
  const authorizationHeader = req.headers?.authorization || req.headers?.Authorization;
  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    return authorizationHeader.split(" ")[1];
  }
  return null;
}

async function authorizer(req, res, next) {
  try {
    const token = extractTokenFromHeader(req);
    if (!token) {
      return res.status(401).send("Unauthorized");
    }
    req.user = await jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }
}

module.exports = {
  authorizer,
  extractTokenFromHeader,
};
