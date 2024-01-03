const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config");

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, config.secretKey, {
    expiresIn: "24h",
  });
};

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const newUser = new User({ username, password, email });
    await newUser.save();
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { login, register };
