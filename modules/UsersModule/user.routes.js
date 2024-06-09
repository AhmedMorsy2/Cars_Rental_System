import { Router } from "express";
import {
  addUser,
  allUsers,
  deleteUser,
  signIn,
  updateUser,
  user,
} from "./users.controller.js";

const userRouter = Router();

userRouter.post("/signup", addUser);
userRouter.post("/signin", signIn);
userRouter.get("/", allUsers);
userRouter.get("/:id", user);

userRouter.put("/update/:id", updateUser);
userRouter.delete("/delete/:id", deleteUser);
export default userRouter;
