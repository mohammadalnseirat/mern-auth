import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { handleErrors } from "../utils/error.js";
import jwt from "jsonwebtoken";

// function to sign up user:
export const signUp = async (req, res, next) => {
  // console.log(req.body);
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 15);

  //   create a user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    // res.status(500).json(error.message);
    next(error);
  }
};

// function for sign in user:
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // find a valid User by email:
    const validUser = await User.findOne({ email });
    // check if user Valid:
    if (!validUser) {
      return next(handleErrors(404, "User not found!"));
    }

    // check if password is correct:
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(handleErrors(401, "Invalid credentials!"));
    }

    // create a token for the user:
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000);
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
