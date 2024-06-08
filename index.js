require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 3000;

// server
app.listen(PORT, () => {
    console.log(
        `Application is running on port ${PORT}. link: http://127.0.0.1:${PORT}.`
    );
});
