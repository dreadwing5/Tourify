const express = require("express");
const morgan = require("morgan");

const app = express();
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
//middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json()); //this middleware - it simply add the data from the body to the req

app.use(express.static("${__dirname}/public"));

app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});
// app.get("/", (req, res) => {
//   res
//     .status(200)
//     .json({ message: "Hello from the server side!", app: "Tourify" });
// });

/* 
//We can use v1 so that whenever we want to do some changes to our api we can just branch off to v2 and make the change their while the old one will still be intact
// app.get("/api/v1/tours", getAllTours);
// app.post("/api/v1/tours", createTour);
 app.get("/api/v1/tours/:id", getTour);

app.patch("/api/v1/tours/:id", updateTour);

//patch - update only some properties
//put - update the entire file

app.delete("/api/v1/tours/:id", deleteTour);
 */
//routes

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

//start server

module.exports = app;
