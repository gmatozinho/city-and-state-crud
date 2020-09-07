var express = require("express");
var router = express.Router();
const { city: cityController } = require("../controllers");
const to = require("await-to-js").default;
const { validate } = require("express-validation");
const {
  city: cityValidator,
  general: generalValidator,
} = require("../validators");

router.get(
  "/",
  validate(cityValidator.getCitySchema),
  async (req, res, next) => {
    const [error, response] = await to(cityController.read(req.query));
    if (error) next(error);
    else res.status(200).json(response);
  }
);

router.get(
  "/:id",
  validate(generalValidator.idParamsSchema),
  async (req, res, next) => {
    const [error, response] = await to(cityController.readById(req.params.id));
    if (error) next(error);
    else res.status(200).json(response);
  }
);

router.post(
  "/",
  validate(cityValidator.createCitySchema),
  async (req, res, next) => {
    const [error, response] = await to(cityController.create(req.body));
    if (error) next(error);
    else res.status(201).json(response);
  }
);

router.patch(
  "/:id",
  validate(cityValidator.updateCitySchema),
  async (req, res, next) => {
    const [error, response] = await to(
      cityController.update(req.params.id, req.body)
    );
    if (error) next(error);
    else res.status(200).json(response);
  }
);

router.delete(
  "/:id",
  validate(generalValidator.idParamsSchema),
  async function (req, res, next) {
    const [error, response] = await to(cityController.remove(req.params.id));
    if (error) next(error);
    else res.status(200).json(response);
  }
);

module.exports = router;
