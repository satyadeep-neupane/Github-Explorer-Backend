const router = require("express").Router();

const { handleErrors } = require("./middleware");
const { searchRepository, getRespositoryDetail } = require("./controller");

// routes here
router.get("/search", searchRepository);
router.get("/repos/:owner/:repo", getRespositoryDetail);

router.use(handleErrors);

module.exports = router;
