const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const List = require('../models/list.model');
const Todo = require('../models/todo.model');

const signup = async (req, res) => {
    if (!('email' in req.body && 'password' in req.body)) {
        return res
            .status(422)
            .json({ message: 'need 2 keys : email, password' });
    }
    const regAlphaNum = new RegExp('^[A-Za-z0-9 ]+$');

    if (
        req.body.email === '' ||
        req.body.email === null ||
        !regAlphaNum.test(req.body.email) ||
        req.body.password === '' ||
        req.body.password === null
    ) {
        return res.status(422).json({ message: 'Format is not correct' });
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
};

const login = async (req, res) => {
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
};

const deleteUser = async (req, res) => {
    // Pour supprimer notre utilisateur, nous devons d'abord récupérer toutes ses listes
    // Afin de supprimer toutes les notes associées
    const lists = await List.find({ userId: req.params.userId });
    if (lists.length > 0) {
        for (const list of lists) {
            await Todo.deleteMany({ listId: list._id.toString() });
        }
        // Une fois que tous les todos on peut supprimer les listes de l'utilisateurs;
        await List.deleteMany({ userId: req.params.userId });
    }
    // Maintenant que nous avons supprimé tout ce qui est relatif à l'utilisateur, nous pouvons le supprimer
    await User.findByIdAndDelete(req.params.userId);
    return res.status(202).json({ message: 'User deleted !' });
};

module.exports.signup = signup;
module.exports.login = login;
module.exports.deleteUser = deleteUser;
