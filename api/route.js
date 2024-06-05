const router = require("express").Router();

const { handleErrors } = require("./middleware");
const { searchRepository, getRepositoryDetail } = require("./controller");

// routes here
router.get("/search", searchRepository);
router.get("/repos/:owner/:repo", getRepositoryDetail);

router.use(handleErrors);

module.exports = router;
