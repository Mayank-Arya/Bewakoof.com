
const express = require('express')
const userRouter = express.Router()
const {userModel} = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const cors = require('cors')
userRouter.use(cors())
//registration


userRouter.post('/register', async (req, res) => {
  const { name, email, password, location, gender, age } = req.body;

  try {
    let isUserPresent = await userModel.findOne({ email });

    if (isUserPresent) {
      return res.status(400).send({ msg: "User already exists! Please log in." });
    }

    const hash = await bcrypt.hash(password, 5);
    const user = new userModel({ name, email, password: hash, location, gender, age });

    await user.save();
    res.status(200).send({ msg: "Registration Successful" });
  } catch (err) {
    res.status(400).send({ msg: err.message, req: false });
  }
});


//login
userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({ msg: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ userID: user._id }, 'project');
      res.status(200).send({ msg: 'Login Successful', token, username: user.name, req: true });
    } else {
      res.status(401).send({ msg: 'Login Failed' });
    }
  } catch (err) {
    res.status(500).send({ msg: 'Internal Server Error' });
  }
});


module.exports = {userRouter}






