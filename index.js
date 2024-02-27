const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const homeRouter = require("./routes/home");
const businessRouter = require("./routes/business");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome Embc API from Express" });
});
app.use("/home", homeRouter);
app.use("/business", businessRouter);

app.listen(4000, () => {
  console.log("server is running at port 4000");
});
