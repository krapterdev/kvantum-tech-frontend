'use strict';
// Zero external dependencies - pure Node.js
module.exports = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({
    ok: true,
    url: req.url,
    method: req.method,
    nodeVersion: process.version,
    cwd: process.cwd(),
    env_db: process.env.DATABASE_URL ? 'SET' : 'NOT_SET'
  }));
};
