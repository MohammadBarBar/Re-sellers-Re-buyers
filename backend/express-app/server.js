const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

app.use(express.json());

const envFilePath = path.join(__dirname, "src", "configs", "config.env");
dotenv.config({ path: envFilePath });
const PORT = process.env.PORT || 5000;
const route = require("./src/routes/router");

app.use(cors());
app.use("/", route);

app.listen(PORT, () => {
  console.log(`Listening to requests on http://localhost:${PORT}`);
});
