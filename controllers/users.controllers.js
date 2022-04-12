import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.stats(400).json({ message: "Invalid credentials" });

    //return, secret, option
    const token = jwt.token.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Oops, something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(404).json({ message: "User already exists." });

    if (password !== confirmPassword)
      return res.stats(400).json({ message: "Passwords don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    });

    const token = jwt.token.sign(
      {
        email: result.email,
        id: result._id,
      },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result, token });
  } catch (err) {
    res.status(500).json({ message: "Oops, something went wrong." });
  }
};
