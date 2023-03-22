const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

export async function signup(req, res) {
    // TODO: Revenir sur la sécurité
    if (!('email' in req.body && 'password' in req.body)) {
        return res
            .status(422)
            .json({ message: 'need 2 keys : email, password' });
    }
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
        return res.status(409).json({ message: 'email already used' });
    }
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    const ans = await User.create({ email, password: hash });
    res.status(201).json({
        message: 'user created',
        user: {
            id: ans._id,
            email,
        },
    });
}

export async function login(req, res) {
    if (!('email' in req.body && 'password' in req.body)) {
        return res
            .status(422)
            .json({ message: 'need 2 keys : email, password' });
    }
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
        return res.status(409).json({ message: 'wrong email or password' });
    }
    const isValid = await bcrypt.compare(password, foundUser.password);
    if (!isValid) {
        return res.status(409).json({ message: 'wrong email or password' });
    }
    const dataToSend = {
        userId: foundUser._id.toString(),
        token: jwt.sign(
            { userId: foundUser._id.toString(), email: foundUser.email },
            process.env.TOKEN_SECRET,
            {
                expiresIn: '10h',
            }
        ),
    };
    res.status(200).json(dataToSend);
}