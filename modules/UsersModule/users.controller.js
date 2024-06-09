import { ObjectId } from "mongodb";
import { db } from "../../database/dbConnection.js";
import bcrypt from "bcrypt";

// User SignUp
let addUser = async (req, res) => {
  try {
    let { name, email, password, phone } = req.body;
    if (!email || !password || !name || !phone)
      return res.status(404).json({ message: "All fields required" });
    req.body.password = await bcrypt.hash(password, 8);
    let existMail = await db.collection("users").findOne({ email: email });
    if (existMail) {
      return res.status(406).json({ message: "Email already exists" });
    }
    let user = await db.collection("users").insertOne(req.body);
    return res
      .status(201)
      .json({ message: "User created successfully", data: user });
  } catch (err) {
    console.log(err);
  }
};

// User SignIn
let signIn = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password)
      return res.status(404).json({ message: "All fields required" });

    let user = await db.collection("users").findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json({ message: "Incorrect email or password" });
    } else {
      const passwordExists = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!passwordExists) {
        return res.status(401).json({ message: "Incorrect email or password" });
      } else {
        return res.status(200).json({ message: "Success" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// Get specific User
let user = async (req, res) => {
  try {
    let userId = new ObjectId(req.params.id);
    let user = await db.collection("users").findOne({ _id: userId });
    if (user) {
      return res.status(200).json({ message: "Success", user });
    }
    return res.status(404).json({ message: "User NotFound" });
  } catch (err) {
    console.log(err);
  }
};
// get all users
let allUsers = async (req, res) => {
  try {
    let users = await db.collection("users").find().toArray();
    if (users.length > 0) {
      return res.status(200).json({ message: "success", data: users });
    }
    return res.status(404).json({ message: "There is no data" });
  } catch (err) {
    console.log(err);
  }
};

// Updat user Owners only
let updateUser = async (req, res) => {
  try {
    let { id, password } = req.body;
    let userId = req.params.id;
    if (!id) {
      return res.status(401).json({ messgae: "Your id is required" });
    }
    if (userId != req.body.id) {
      return res.status(404).json({ message: "You are not authorized" });
    }

    if (password) {
      req.body.password = await bcrypt.hash(password, 8);
      let updatedData = await db
        .collection("users")
        .updateOne({ _id: new ObjectId(userId) }, { $set: req.body });
      if (updatedData.matchedCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "success", updatedData });
    } else {
      let updatedData = await db
        .collection("users")
        .updateOne({ _id: new ObjectId(userId) }, { $set: req.body });

      res.status(200).json({ message: "success", updatedData });
    }
  } catch (err) {
    console.log(err);
  }
};

// Delete user Owners Only
let deleteUser = async (req, res) => {
  try {
    let { id } = req.body;
    let userId = req.params.id;
    if (!id) {
      return res.status(401).json({ messgae: "Your id is required" });
    }
    if (userId != req.body.id) {
      return res.status(404).json({ message: "You are not authorized" });
    }

    let deletedUser = await db
      .collection("users")
      .deleteOne({ _id: new ObjectId(userId) });
    if (deletedUser.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
  }
};

export { addUser, allUsers, signIn, user, updateUser, deleteUser };
