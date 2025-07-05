import UserService from "../services/UserService.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await UserService.signup({ name, email, password });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message || "Error in adding user" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await UserService.login(email, password);

    if (!result) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getCount = async (req, res) => {
  try {
    const totalUsers = await UserService.getCount();
    res.status(200).json({ totalUsers });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await UserService.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
