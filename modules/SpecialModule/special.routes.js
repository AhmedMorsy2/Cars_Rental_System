import { Router } from "express";
import {
  availableCars,
  htCars,
  rentedOrModel,
  specificModelOrRented,
} from "./special.controller.js";

let spRouter = Router();

spRouter.get("/:honda/:toyota", htCars);
spRouter.get("/model/:model/:status", specificModelOrRented);
spRouter.get("/model/:model");
spRouter.get("/rentedmodel/:model", rentedOrModel);
export default spRouter;
