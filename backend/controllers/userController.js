import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (user) => {
    return jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "3d" });
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            // Now call createToken after user is defined
            const token = createToken(user);  // Pass the user object to the token function
            res.status(200).json({ success: true, token, user });
        } else {
            res.status(400).json({ success: false, message: "Incorrect password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Validate fields
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();

        // Create JWT token
        const token = createToken(user._id);

        // Send response
        res.status(200).json({ success: true, token, user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export { login, register };