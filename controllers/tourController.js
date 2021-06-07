const { EPROTONOSUPPORT } = require("constants");
const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log("Tour id is : ${val}");
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: "fail", message: "invalid ID" });
  }
  //204 - Delete request, when the status is success but the data is null
  res.status(204).json({
    status: "success",
    data: null, //data that we deleted no longer exist
  });
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name of price",
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1; //short trick to convert the string to a number
  const tour = tours.find((el) => el.id === id);
  // if (id > tours.length) {

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>",
    },
  });
};

exports.deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: "fail", message: "invalid ID" });
  }
  //204 - Delete request, when the status is success but the data is null
  res.status(204).json({
    status: "success",
    data: null, //data that we deleted no longer exist
  });
};
