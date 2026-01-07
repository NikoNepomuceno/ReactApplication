import jwt from 'jsonwebtoken';
import supabase from '../config/db.js';
import {hashPassword, comparePassword} from '../utils/passwordUtils.js';

const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE_IN});
};

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('email', email.toLowerCase())
            .single();

        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        const hashedPassword = await hashPassword(password);

       const { data: user, error } = await supabase
        .from('users')
        .insert({
            name,
            email: email.toLowerCase(),
            password: hashedPassword
        })
        .select('id, name, email, created_at')
        .single();

        if (error) {
            throw error;
        }


        const token = generateToken(user.id);

        res.cookie('authToken', token, {
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

        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email.toLowerCase())
            .single();

        if (!user) {
            return res.status(401).json({
                message: 'Invalid Credentials'
            });
        }


        const isPasswordValid = await comparePassword(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    message: 'Invalid credentials'
                });
            }
        
        const token = generateToken(user.id);

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 //this totals to 7 days
        });

        const { password: _, ...userWithoutPassword } = user;

        res.json({
            message: 'Login successful',
            user: userWithoutPassword
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const logout = (req, res) => {
    res.cookie('authToken', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.json({ message: 'Logout successful' });
};


export const getMe = async (req, res) => {
    try {
        const { data: user, error } = await supabase
            .from('users')
            .select('id, name, email, created_at')
            .eq('id', req.user.id)
            .single();

        if (error) throw error;

        res.json({ user });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};