const List = require('../models/list.model');

export async function getLists(req, res) {
    const getListsByUserId = await List.find({ userId: req.user.userId });
    res.status(200).json(getListsByUserId);
}

export async function updateList(req, res) {
    const ans = await List.findByIdAndUpdate(req.params.listId, req.body, {
        new: true,
    });
    res.status(200).json({
        message: 'list updated !',
        updatedList: ans,
    });
}

export async function deleteList(req, res) {
    await List.findByIdAndDelete(req.params.listId);
    return res.status(202).json({ message: 'list deleted !' });
}
