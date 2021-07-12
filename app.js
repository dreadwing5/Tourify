const express = require("express");
const morgan = require("morgan");

const app = express();

//Router middleware
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

//middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json()); //this middleware - it simply add the data from the body to the req

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});

//routes

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

//start server

module.exports = app;
