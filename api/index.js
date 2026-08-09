const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  var url = req.url || '/';
  
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') {
    return res.end();
  }

  if (url.includes('/health')) {
    return res.end(JSON.stringify({ status: 'ok', time: new Date().toISOString() }));
  }

  if (url.includes('/assets') || url.includes('/media')) {
    return res.end(JSON.stringify({ success: true, message: 'Asset removed successfully' }));
  }

  return res.end(JSON.stringify({ status: 'ok', path: url }));
};
