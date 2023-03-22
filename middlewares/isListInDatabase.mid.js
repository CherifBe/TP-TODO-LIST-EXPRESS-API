const List = require('../models/list.model');

const isListInDatabase = async (req, res, next) => {
    try {
        const getListById = await List.findById(req.params.listId);
        if (!getListById) {
            return res.status(404).json({ message: 'List not found' });
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = isListInDatabase;
