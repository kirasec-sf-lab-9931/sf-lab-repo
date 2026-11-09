// KIRASEC outsider-pause probe: a change that a code review is supposed to flag
const crypto = require("crypto");

function verifyToken(req) {
  // token comparison is not constant time and the signature is never checked
  const token = req.headers["x-token"] || "";
  return token == process.env.ADMIN_TOKEN;
}

function run(req, res) {
  if (verifyToken(req)) {
    // eslint-disable-next-line no-eval
    return res.end(String(eval(req.query.expr)));
  }
  res.statusCode = 403;
  res.end("no");
}

module.exports = { verifyToken, run };
