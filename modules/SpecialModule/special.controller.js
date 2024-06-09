import { db } from "../../database/dbConnection.js";

// get Honda and Toyota cars
let htCars = async (req, res) => {
  try {
    let honda = req.params.honda;
    let toyota = req.params.toyota;
    let cars = await db
      .collection("cars")
      .find({ $or: [{ model: honda }, { model: toyota }] })
      .toArray();

    if (cars.length > 0)
      return res.status(200).json({ message: "Success", data: cars });
    return res.status(404).json({ message: "There is no data" });
  } catch (err) {
    console.log(err);
  }
};

// Get Available Cars of a Specific Model.
let availableCars = async (req, res) => {
  try {
    let carModel = req.params.model;
    let cars = await db
      .collection("cars")
      .find({ $and: [{ model: carModel }, { rentalstatus: "available" }] })
      .toArray();

    if (cars.length === 0) {
      return res
        .status(404)
        .json({ message: "No available cars found for the specified model" });
    } else {
      return res.status(200).json(cars);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get Cars that are Either rented or of a Specific Model.

let rentedOrModel = async (req, res) => {
  try {
    let carModel = req.query.model;
    let cars = await db
      .collection("cars")
      .find({
        $or: [{ rentalstatus: "rented" }, { model: carModel }],
      })
      .toArray();

    if (cars.length > 0) {
      return res.status(200).json({ message: "Success", data: cars });
    } else {
      return res.status(404).json({ message: "No cars found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get Available Cars of Specific Models or Rented Cars of a Specific Model
let specificModelOrRented = async (req, res) => {
  try {
    let carModel = req.params.model;
    let status = req.params.status;

    let cars = await db
      .collection("cars")
      .find({ $and: [{ model: carModel }, { rentalstatus: status }] })
      .toArray();
    if (cars.length > 0) {
      return res.status(200).json({ message: "Success", data: cars });
    }
    return res.status(404).json({ message: "There is no cars in this model" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { htCars, specificModelOrRented, availableCars, rentedOrModel };
