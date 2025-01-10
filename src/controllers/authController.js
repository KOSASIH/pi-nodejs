const { register, login } = require('../services/auth');

const registerUser = async (req, res) => {
    try {
        await register(req.body.username, req.body.password);
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const loginUser = async (req, res) => {
    try {
        const token = await login(req.body.username, req.body.password);
        res.json(token);
    } catch (error) {
        res.status(401).send(error.message);
    }
};

module.exports = { registerUser, loginUser };
