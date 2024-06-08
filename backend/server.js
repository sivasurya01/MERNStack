const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const usermodel = require("./models/User");
const todomodel = require("./models/Todo");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const registerusermodel = require("./models/registeruser");
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieparser());
// mongoose.connect("mongodb://127.0.0.1:27017/sivasurya")
// mongoose.connect("mongodb://127.0.0.1:27017/sivasurya")
const mongoUri =
  "mongodb+srv://sivasurya27052001:NuTy0JPTLOBHzDAm@cluster0.8zmewxw.mongodb.net/test"; // Replace 'yourDatabaseName' with your actual database name
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
// app.get("/", (req, res) => {
//   res.send("hello Server is running...");
// });
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
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  registerusermodel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign(
            { email: user.email, role: user.role },
            "jwt-secret-key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          return res.json(user);
        } else {
          return res.json("the password is incorrect");
        }
      });
    } else {
      return res.json("no record exit");
    }
  });
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
app.get("/", (req, res) => {
  usermodel
    .find({})
    .then((users) => res.json(users), res.send("hello Server is running..."))
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
