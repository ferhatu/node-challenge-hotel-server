const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

// TODO add your routes and helper functions here

//create new  booking
app.post("/bookings", (req, res) => {
  bookings.push(req.body);
  res.send({ success: true });
});

// read all bookings
app.get("/bookings", function (request, response) {
  response.send(bookings);
});

//read one booking

app.get("/bookings/:id", (req, res) => {
  const bookingId = Number(req.params.id);
  const selectById = bookings.find((item) => item.id === bookingId);
  selectById
    ? response.send(selectById)
    : response.status(404).send("No booking found");
});

const port = process.env.PORT || 5000;
app.listen(port);

// const listener = app.listen(process.env.PORT, function () {
//   console.log("Your app is listening on port " + listener.address().port);
// });