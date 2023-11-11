require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
// Middlewares
app.use(express.json());
app.use(cors());

app.use("/api/users", require("./routes/user"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/auth", require("./routes/auth"));

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
