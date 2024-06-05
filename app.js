const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", require("./api/route"));

app.get("*", (_, res) => {
    res.json({
        site_name: "Github Explorer",
        message: "Request Not Matched",
    });
});

module.exports = app;
