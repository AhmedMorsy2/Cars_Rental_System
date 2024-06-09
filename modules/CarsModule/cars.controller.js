import { ObjectId } from "mongodb";
import { db } from "../../database/dbConnection.js";

// Add Car
let addCar = async (req, res) => {
  try {
    let { name, model, rentalstatus } = req.body;
    if (!name || !model || !rentalstatus)
      return res.status(404).json({ message: "All fields required" });
    let car = await db.collection("cars").insertOne(req.body);
    res.status(201).json({ message: "Added", car });
  } catch (err) {
    console.log(err);
  }
};

// Get specific car
let oneCar = async (req, res) => {
  try {
    let carId = new ObjectId(req.params.id);
    let car = await db.collection("cars").findOne({ _id: carId });
    if (car) {
      return res.status(200).json({ message: "Success", car });
    }
    return res.status(404).json({ message: "Car NotFound" });
  } catch (err) {
    console.log(err);
  }
};

// Get all cars
let allCars = async (req, res) => {
  try {
    let cars = await db.collection("cars").find({}).toArray();
    if (cars.length > 0)
      return res.status(200).json({ message: "Success", cars });
    return res.status(404).json({ message: "There is no data" });
  } catch (err) {
    console.log(err);
  }
};

// update car
let updateCar = async (req, res) => {
  try {
    let carId = new ObjectId(req.params.id);
    let car = await db
      .collection("cars")
      .updateOne({ _id: carId }, { $set: req.body });

    if (car.matchedCount === 0) {
      return res.status(404).json({ message: "Car not found" });
    }
    return res.status(200).json({ message: "Updated" });
  } catch (err) {
    console.log(err);
  }
};

// Delete car
let deleteCar = async (req, res) => {
  try {
    let carId = new ObjectId(req.params.id);
    let car = await db.collection("cars").deleteOne({ _id: carId });

    if (car.deletedCount == 0) {
      return res.status(404).json({ message: "Car not found" });
    } else {
      return res.status(200).json({ message: "Success" });
    }
  } catch (err) {
    console.log(err);
  }
};

export { addCar, allCars, oneCar, updateCar, deleteCar };
