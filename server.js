const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("/getUsers", async (req, res) => {
  let results = await User.find();

  res.json(results);
});
app.listen(2222, () => {
  console.log(`Listening to port 2222`);
});

let connectToMDB = async () => {
  try {
    // await mongoose.connect("mongodb://localhost:27017/batch2301");
    await mongoose.connect(
      "mongodb+srv://manjunadhb:manjunadhb@cluster0.ikbqkxh.mongodb.net/users?retryWrites=true&w=majority"
    );

    console.log(`Connected to MDB`);
    storeDataIntoDB();
  } catch {
    console.log(`Unable to connect to MDB`);
  }
};

let userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [2, "Too small name"],
    maxLength: [30, "Too big name"],
  },
  lastName: String,
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    required: [true, "User emaild id required"],
  },
  gender: {
    type: String,
    required: true,
    lowercase: true,
    enum: {
      values: ["male", "female"],
      message: "{VALUE} is not a valid gender",
    },
  },
  maritalStatus: {
    type: String,
    required: true,
    lowercase: true,
    enum: {
      values: ["single", "married"],
      message: "{VALUE} is not a valid gender",
    },
  },
  age: {
    type: Number,
    required: true,
    min: [18, "Too early to create account"],
    max: [80, "Too late to create an account"],
  },
  batchId: Number,
});

let User = new mongoose.model("user", userSchema);

// app.post("/signup", async (req, res) => {
//   let shyam = new User({
//     firstName: req.body.firstName,
//     lastName: req.body.firstName,
//     email: "shyam@gmail.com",
//     gender: "MALE",
//     maritalStatus: "single",
//     age: 22,
//     batchId: 1000,
//   });

//   await User.insertMany([shyam]);
//   console.log(`Successfully saved into mdb`);
// });

let storeDataIntoDB = async () => {
  try {
    let shyam = new User({
      firstName: "Younus",
      lastName: "Ali",
      email: "younusali@gmail.com",
      gender: "MALE",
      maritalStatus: "single",
      age: 22,
      batchId: 1000,
    });

    User.insertMany([shyam]);
    console.log(`Successfully saved into mdb`);
  } catch {
    console.log(`Unable to store data into mdb`);
  }
};

connectToMDB();
