import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";

const UserService = {
  signup: async ({ fullname, email, password }) => {
    if (!fullname || typeof fullname !== "string") {
      throw new Error("Name must be a string");
    }

    if (!email ) {
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
      fullname,
      email,
      password: hashedPassword,
      isLogged: false
    });

    return await newUser.save();
  },

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
    await User.updateOne(
      { _id: user.id },
      { $set: { isLogged: true } }
    )

    return {
      token,
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        online: user.isLogged
      }
    };
  },

  getCount: async () => {
    try {
      return await User.countDocuments();
    } catch (err) {
      throw new Error("Unable to find User count");
    }
  },

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
