import { Router } from "express";
import {
  addRent,
  allRent,
  deleteRent,
  oneRent,
  rentCar,
  returnCar,
  updateRent,
} from "./rent.controller.js";

const rentRouter = Router();

rentRouter.post("/add", addRent);
rentRouter.put("/update/:id", updateRent);
rentRouter.delete("/delete/:id", deleteRent);
rentRouter.get("/", allRent);
rentRouter.get("/:id", oneRent);

rentRouter.post("/rentcar", rentCar);
rentRouter.post("/returncar", returnCar);

export default rentRouter;
