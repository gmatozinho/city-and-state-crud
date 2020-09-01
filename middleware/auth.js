var apiKeyAuth = () => {
  return (req, res, next) => {
    if (!req.headers["x-api-key"]) {
      return res.json({ error: "No credentials sent!" });
    } else if (req.headers["x-api-key"] != "test") {
      return res.json({ error: "Wrong credentials sent!" });
    }
    next();
  };
};

module.exports = apiKeyAuth;
