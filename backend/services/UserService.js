import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";

const UserService = {
  // Signup
  signup: async ({ name, email, password }) => {
    if (!name || typeof name !== "string") {
      throw new Error("Name must be a string");
    }

    if (!email || !/.+\@.+\..+/.test(email)) {
      throw new Error("Invalid email format.");
    }

    if (!password || password.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email is already in use.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    return await newUser.save();
  },

  // Login
  login: async (email, password) => {
    if (!email) {
      throw new Error("Email is required.");
    }
    if (!password) {
      throw new Error("Password is required.");
    }

    const user = await User.findOne({ email });
    if (!user) throw new Error("Email not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Password is incorrect");

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
  },

  // Get user count
  getCount: async () => {
    try {
      return await User.countDocuments();
    } catch (err) {
      throw new Error("Unable to find User count");
    }
  },

  // Find user by ID
  findById: async (id) => {
    try {
      const user = await User.findById(id);
      return user;
    } catch (err) {
      throw new Error("Database error");
    }
  }
};

export default UserService;
