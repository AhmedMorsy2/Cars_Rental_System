import express from "express";
import userRouter from "./modules/UsersModule/user.routes.js";
import { db } from "./database/dbConnection.js";
import carsRouter from "./modules/CarsModule/cars.routes.js";
import rentRouter from "./modules/RentalModule/rent.routes.js";
import spRouter from "./modules/SpecialModule/special.routes.js";
const app = express();
const port = 3000;
app.use(express.json());

// Users
app.use("/users", userRouter);

// cars
app.use("/cars", carsRouter);

// Rental
app.use("/rent", rentRouter);

// Special
app.use("/special", spRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
