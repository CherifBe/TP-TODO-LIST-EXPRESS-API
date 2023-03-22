const router = require('express').Router();
const { signup, login } = require('../controllers/auth.controller');

router.post('/signup', async (req, res, next) => {
    try {
        await signup(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        await login(req, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
