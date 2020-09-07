var express = require("express");
var router = express.Router();
const { state: stateController } = require("../controllers");
const to = require("await-to-js").default;
const { validate } = require("express-validation");
const {
  state: stateValidator,
  general: generalValidator,
} = require("../validators");

router.get(
  "/",
  validate(stateValidator.getStateSchema),
  async (req, res, next) => {
    const [error, response] = await to(stateController.read(req.query));
    if (error) next(error);
    else res.status(200).json(response);
  }
);

router.get(
  "/:id",
  validate(generalValidator.idParamsSchema),
  async (req, res, next) => {
    const [error, response] = await to(stateController.readById(req.params.id));
    if (error) next(error);
    else res.status(200).json(response);
  }
);

router.post(
  "/",
  validate(stateValidator.createStateSchema),
  async (req, res, next) => {
    const [error, response] = await to(stateController.create(req.body));
    if (error) next(error);
    else res.status(201).json(response);
  }
);

router.patch(
  "/:id",
  validate(stateValidator.updateStateSchema),
  async function (req, res, next) {
    const [error, response] = await to(
      stateController.update(req.params.id, req.body)
    );
    if (error) next(error);
    else res.status(200).json(response);
  }
);

router.delete(
  "/:id",
  validate(generalValidator.idParamsSchema),
  async function (req, res, next) {
    const [error, response] = await to(stateController.remove(req.params.id));
    if (error) next(error);
    else res.status(200).json(response);
  }
);

module.exports = router;
