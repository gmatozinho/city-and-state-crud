var apiKeyAuth = () => {
  return (req, res, next) => {
    if (!req.headers["x-api-key"]) {
      return res.status(401).json({ message: "No credentials sent!" });
    } else if (req.headers["x-api-key"] != "test") {
      return res.status(401).json({ message: "Wrong credentials sent!" });
    }
    next();
  };
};

module.exports = apiKeyAuth;
