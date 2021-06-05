const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json()); //this middleware - it simply add the data from the body to the req

// app.get("/", (req, res) => {
//   res
//     .status(200)
//     .json({ message: "Hello from the server side!", app: "Tourify" });
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1; //short trick to convert the string to a number
  const tour = tours.find((el) => el.id === id);
  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({ status: "fail", message: "invalid ID" });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      //201 - file created
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: "fail", message: "invalid ID" });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>",
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: "fail", message: "invalid ID" });
  }
  //204 - Delete request, when the status is success but the data is null
  res.status(204).json({
    status: "success",
    data: null, //data that we deleted no longer exist
  });
};

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

app.route("/api/v1/tours").get(getAllTours).post(createTour);

app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
