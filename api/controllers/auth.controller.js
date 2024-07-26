import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signUp = async (req, res,next) => {
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
