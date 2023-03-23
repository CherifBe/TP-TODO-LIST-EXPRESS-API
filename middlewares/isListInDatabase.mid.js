const List = require('../models/list.model');

const isListInDatabase = async (req, res, next) => {
    try {
        const getListById = await List.findById(req.params.listId);
        if (!getListById) {
            return res.status(404).json({ message: 'List not found' });
        }
        if (getListById.userId.toString() !== req.user.userId) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = isListInDatabase;
