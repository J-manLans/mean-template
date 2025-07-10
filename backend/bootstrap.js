/* ==============================
    Import necessary modules
============================== */

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import connection from "./database.js";

/**
 * Initialize and start the Express app.
 * Applies middleware, connects to DB, defines routes, and starts server.
 * @param {Object} app - the express.js application
 */
const Bootstrap = async (app) => {
    /*============================
        Variables
    ============================*/

    const port = process.env.PORT || 3000;

    /*============================
        Middleware
    ============================*/

    // Parse incoming JSON requests and limit size to 1KB to help prevent DoS attacks with large payloads
    app.use(express.json({ limit: '1kb' }));
    app.use(cors());

    /*============================
        Database connection
    ============================*/

    await connection();

    /*============================
        Example test routes
    ============================*/

    const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    });

    const User = mongoose.model('User', userSchema);

    app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
    });

    app.get('/api/greeting', (req, res) => {
    res.json({ message: "Hello Brave New World" });
    });

    app.get('/', (req, res) => {
    res.send('🚀 Backend is working very well indeed!');
    });

    app.post('/api/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
    });

    /*========================
        Start server
    ========================*/

    app.listen(port, () => {
        console.log(`🚀 Server running at http://localhost:${port}`);
    });
}

export default Bootstrap;
