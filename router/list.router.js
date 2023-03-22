const router = require('express').Router();
const {
    getLists,
    updateList,
    deleteList,
} = require('../controllers/list.controller');
const authorization = require('../middlewares/authorization.mid');
const isListInDatabase = require('../middlewares/isListInDatabase.mid');

router.get('/', authorization, async (req, res, next) => {
    try {
        await getLists(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.patch(
    '/:listId',
    authorization,
    isListInDatabase,
    async (req, res, next) => {
        try {
            await updateList(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);

router.delete(
    '/:listId',
    authorization,
    isListInDatabase,
    async (req, res, next) => {
        try {
            await deleteList(req, res, next);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
