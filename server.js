require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logger"); //logger
const errorHandler = require("./middleware/errorHandler"); //error handler logger
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConnection");
const mongoose = require("mongoose");
const { logEvents } = require("./middleware/logger"); //logger

const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV);

connectDB();

app.use(logger);
// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json()); //for parse json req
app.use(cookieParser()); //for cookie

app.use("/", express.static("public")); //middleware for public folder for css of pictures
//same // app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root")); //routing
app.use("/users", require("./routes/userRoutes"));
app.use("/notes", require("./routes/noteRouter"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 NOT Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port  ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
