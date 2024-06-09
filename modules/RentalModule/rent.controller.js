import { db } from "../../database/dbConnection.js";
import { ObjectId } from "mongodb";

// add Rent
let addRent = async (req, res) => {
  try {
    let { car, customer, rentDate } = req.body;
    if (!car || !customer || !rentDate) {
      return res.status(404).json({ message: "All Fields Requireds" });
    }
    let rent = await db.collection("rental").insertOne(req.body);

    return res.status(200).json({ message: "Success", data: rent });
  } catch (err) {
    console.log(err);
  }
};

// update Rent
let updateRent = async (req, res) => {
  try {
    let rentId = new ObjectId(req.params.id);
    let rent = await db
      .collection("rental")
      .updateOne({ _id: rentId }, { $set: req.body });
    if (rent.matchedCount === 0) {
      return res.status(404).json({ message: "Car not found" });
    } else {
      return res.status(200).json({ messgae: "success" });
    }
  } catch (err) {
    console.log(err);
  }
};

// Delete Rent
let deleteRent = async (req, res) => {
  try {
    let rentId = new ObjectId(req.params.id);
    let rent = db.collection("rental").deleteOne({ _id: rentId });
    if (rent.deletedCount == 0) {
      return res.status(404).json({ message: "Rent not found" });
    } else {
      return res.status(200).json({ message: "Success" });
    }
  } catch (err) {
    console.log(err);
  }
};

// All Rents
let allRent = async (req, res) => {
  try {
    let rents = await db.collection("rental").find().toArray();
    if (rents.length > 0)
      return res.status(200).json({ message: "success", data: rents });
    return res.status(404).json({ meesgae: "There is no data" });
  } catch (err) {
    console.log(err);
  }
};

// Specific Rent
let oneRent = async (req, res) => {
  try {
    let rentId = new ObjectId(req.params.id);
    let rent = await db.collection("rental").findOne({ _id: rentId });
    if (rent) return res.status(200).json({ message: "success", data: rent });
    return res.status(404).json({ message: "Rent notFound" });
  } catch (err) {
    console.log(err);
  }
};

// Rent a Car
const rentCar = async (req, res) => {
  try {
    const { car, customer } = req.body;

    const isRented = await db.collection("rental").findOne({
      car: new ObjectId(car),
      returnedDate: { $exists: false },
    });
    if (isRented) {
      return res.status(400).json({ message: "Car is already rented" });
    }

    const rentalData = {
      car: new ObjectId(car),
      customer: new ObjectId(customer),
      rentalDate: new Date(),
    };

    await db.collection("rental").insertOne(rentalData);
    await db
      .collection("cars")
      .updateOne(
        { _id: new ObjectId(car) },
        { $set: { rentalstatus: "rented" } }
      );

    res.status(200).json({ message: "Car rented successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Return Car
const returnCar = async (req, res) => {
  try {
    const { car } = req.body;

    const isReturned = await db.collection("rental").findOne({
      car: new ObjectId(car),
      returnedDate: { $exists: false },
    });
    if (!isReturned) {
      return res.status(400).json({ message: "Car is already returned" });
    }
    await db
      .collection("rental")
      .updateOne(
        { car: new ObjectId(car), returnedDate: { $exists: false } },
        { $set: { returnedDate: new Date() } }
      );

    await db
      .collection("cars")
      .updateOne(
        { _id: new ObjectId(car) },
        { $set: { rentalstatus: "available" } }
      );

    res.status(200).json({ message: "Car returned successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export {
  addRent,
  updateRent,
  deleteRent,
  allRent,
  oneRent,
  rentCar,
  returnCar,
};
