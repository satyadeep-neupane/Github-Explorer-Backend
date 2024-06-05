const router = require("express").Router();

const { handleErrors } = require("./middleware");
const { searchRespository, getRespositoryDetail } = require("./controller");

// routes here
router.get("/search", searchRespository);
router.get("/repos/:owner/:repo", getRespositoryDetail);

router.use(handleErrors);

module.exports = router;
