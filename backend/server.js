const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const usermodel = require("./models/User");
const todomodel = require("./models/Todo");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieparser = require("cookie-parser");
const registerusermodel = require("./models/registeruser");
const app = express();
app.use(
  cors({
    origin: ["https://sivausers-management-system.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cors());
app.use(express.json());
app.use(cookieparser());
// mongoose.connect("mongodb://127.0.0.1:27017/sivasurya")
// mongoose.connect("mongodb://127.0.0.1:27017/sivasurya");
const mongoUri = process.env.MONGO_URI;
async function connectDB() {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
}

connectDB();
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauth" });
  }
  try {
    res.user = token;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Unauth" });
  }
};
app.get("/", (req, res) => {
  res.send("hello Server is running...");
});
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      registerusermodel
        .create({ name, email, password: hash })
        .then((users) => res.json(users))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});
//login route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await registerusermodel.findOne({ email: email });

    // If user not found
    if (!user) {
      return res.status(404).json({ message: "No record exists" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password does not match
    if (!isPasswordValid) {
      return res.status(401).json({ message: "The password is incorrect" });
    }

    // If password matches
    const token = jwt.sign(
      { email: user.email, role: user.role },
      "jwt-secret-key",
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true, secure: true }); // Ensure secure in production
    return res.json({ user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
app.post("/createUser", (req, res) => {
  usermodel
    .create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
app.post("/createtodo", (req, res) => {
  todomodel
    .create(req.body)
    .then((todo) => res.json(todo))
    .catch((err) => res.json(err));
});
app.get("/createtodo", (req, res) => {
  todomodel
    .find({}) //all data from database
    .then((todo) => res.json(todo))
    .catch((err) => res.json(err));
});
app.get("/users/users", authMiddleware, async (req, res) => {
  usermodel
    .find({})
    .then(async (users) => await res.json(users))
    .catch((err) => console.log(err));
});
app.get("/Updateuser/:id", (req, res) => {
  let id = req.params.id;
  usermodel
    .findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});
app.put("/Update/:id", (req, res) => {
  let id = req.params.id;
  usermodel
    .findByIdAndUpdate(
      { _id: id },
      {
        username: req.body.username,
        email: req.body.email,
        nunmber: req.body.nunmber,
      }
    )
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});
app.delete("/delete/:id", (req, res) => {
  let id = req.params.id;
  usermodel
    .findByIdAndDelete({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});
app.listen(3000, () => {
  console.log("server starting");
});
