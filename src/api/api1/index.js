const express = require("express");
const controller = require("./controller.js");

const router = express.Router();

router.use(controller.init);
router.post("/", controller.post);
router.get("/:id", controller.get);
router.get("/", controller.getAll);
router.patch("/:id", controller.patch);
router.put("/:id", controller.put);
router.delete("/:id", controller.remove);

module.exports = router;
