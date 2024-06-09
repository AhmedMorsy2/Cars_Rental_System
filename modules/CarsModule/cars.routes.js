import { Router } from "express";
import {
  addCar,
  allCars,
  deleteCar,
  oneCar,
  updateCar,
} from "./cars.controller.js";

const carsRouter = Router();

carsRouter.post("/add", addCar);
carsRouter.get("/", allCars);
carsRouter.get("/:id", oneCar);
carsRouter.put("/update/:id", updateCar);
carsRouter.delete("/delete/:id", deleteCar);


export default carsRouter;
