import User from "../models/User.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const index = (req, res) => {
  res.json({ user: req.user });
};
