import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const categories = [
  { label: "Transportation", icon: "🚗" },
  { label: "Shopping", icon: "🛒" },
  { label: "Bills", icon: "🧾" },
  { label: "Investment", icon: "📈" },
];

export const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(406).json({ message: "User already existed" });
    return;
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hashSync(password, salt);
  console.log(hashedPassword);

  const user = await User({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    categories,
  });
  const savedUser = await user.save();
  console.log(savedUser);

  res.status(201).json({ message: "User created" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(406).json({ message: "Credentials not found" });
    return;
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    res.status(406).json({ message: "Wrong password" });
    return;
  }

  const payload = {
    username: email,
    _id: user._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  res.json({ message: "Successfully logged in", token, user });
};
