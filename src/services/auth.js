const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = ```javascript
require('../models/User'); // Assuming you have a User model

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

const register = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser  = new User({ username, password: hashedPassword });
    await newUser .save();
};

const login = async (username, password) => {
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
        return { token };
    }
    throw new Error('Invalid credentials');
};

module.exports = { register, login };
