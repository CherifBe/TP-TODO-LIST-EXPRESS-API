const List = require('../models/list.model');

const getLists = async (req, res) => {
    const getListsByUserId = await List.find({ userId: req.user.userId });
    res.status(200).json(getListsByUserId);
};

const updateList = async (req, res) => {
    const ans = await List.findByIdAndUpdate(req.params.listId, req.body, {
        new: true,
    });
    res.status(200).json({
        message: 'list updated !',
        updatedList: ans,
    });
};

const deleteList = async (req, res) => {
    await List.findByIdAndDelete(req.params.listId);
    return res.status(202).json({ message: 'list deleted !' });
};

module.exports = getLists;
module.exports = updateList;
module.exports = deleteList;
