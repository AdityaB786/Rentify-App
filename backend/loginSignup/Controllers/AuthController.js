const UserModel = require('../Models/User');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_JWT = process.env.SECRET_JWT;

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists, try logging in',
                success: false
            });
        }

        // Create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({
            message: "Signup successful",
            success: true
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(403).json({
                message: 'User does not exist / Email is incorrect',
                success: false
            });
        }

        const isPasswdEqual = await bcrypt.compare(password, user.password);
        if (!isPasswdEqual) {
            return res.status(403).json({
                message: 'Password is incorrect',
                success: false
            });
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            SECRET_JWT,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name: user.name
        });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({
            message: "Internal server error",
            success: false // Changed success to false on error
        });
    }
};

module.exports = { signup, login };
