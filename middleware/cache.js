var mcache = require("memory-cache");

var cache = (duration) => {
  return (req, res, next) => {
    if (req.method == "GET") {
      let key = "__express__" + req.originalUrl || req.url;
      let cachedBody = mcache.get(key);
      if (cachedBody) {
        res.status(200).json(cachedBody);
        return;
      } else {
        res.sendResponse = res.status(200).json;
        res.status(200).json = (body) => {
          mcache.put(key, body, duration * 1000);
          res.sendResponse(body);
        };
        next();
      }
    } else {
      next();
    }
  };
};

module.exports = cache;
