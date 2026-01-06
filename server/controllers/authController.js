import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {hashPassword, comparePassword} from '../utils/passwordUtils.js';

const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE_IN});
};

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            name, 
            email, 
            password: hashedPassword
        });

        const token = generateToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 //this totals to 7 days
        });

        res.status(201).json({
            message: 'User registered successfully',
            user
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isPasswordValid = await comparePassword(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    message: 'Invalid credentials'
                });
            }
        
        const token = generateToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 //this totals to 7 days
        });

        res.json({
            message: 'Login successful',
            user
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const logout = (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.json({ message: 'Logout successful' });
};


export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json({ user });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};