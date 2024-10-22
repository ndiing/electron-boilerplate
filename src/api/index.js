const express = require("express");
const { security, cors, cookies, compression, body, authorization, missing, catchAll } = require("../middleware/index.js");

const router = express.Router();

router.use(
    security({
        "Content-Security-Policy": "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;",
    }),
);
router.use(cors());
router.use(compression());
router.use(cookies());
router.use(body());
router.use(authorization());

router.use("/api1", require("./api1/index.js"));

router.use(missing());
router.use(catchAll());

module.exports = router;
