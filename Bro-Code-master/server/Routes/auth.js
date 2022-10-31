const express = require('express');
const router = express.Router()

const bcrypt = require('bcrypt')
const crypto = require('crypto')

const StreamChat = require('stream-chat').StreamChat;

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

require('dotenv').config();

router.post('/signup', async (req, res) => {
    try {
        const { fullName, username, password, phoneNumber } = req.body;

        const userId = crypto.randomBytes(16).toString('hex');
        const hashedPassword = await bcrypt.hash(password, 10);

        const serverClient = StreamChat.getInstance(api_key, api_secret)
        const token = serverClient.createToken(userId);

        res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const serverClient = StreamChat.getInstance(api_key, api_secret);

        const { users } = await serverClient.queryUsers({ name: username });
        if (!users.length) return res.status(400).json({ message: 'User not found' });

        const success = await bcrypt.compare(password, users[0].hashedPassword);

        if (success) {
            const token = serverClient.createToken(users[0].id);
            res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id });
        } else {
            res.status(500).json({ message: 'Incorrect Password' });

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
})

module.exports = router;