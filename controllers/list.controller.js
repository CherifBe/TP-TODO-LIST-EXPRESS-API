const List = require('../models/list.model');
const Todo = require('../models/todo.model');
const checkRequest = require('../services/checkRequest.service');

const getLists = async (req, res) => {
    const getListsByUserId = await List.find({ userId: req.user.userId });
    res.status(200).json(getListsByUserId);
};

const insertList = async (req, res) => {
    if (!('userId' in req.body && 'title' in req.body)) {
        return res.status(422).json({ message: 'need 2 keys : userId, title' });
    }
    const listFromRequest = req.body;
    const listModelKeys = ['userId', 'title'];
    checkRequest(res, listFromRequest, listModelKeys);
    const titleAlreadyExist = await List.find({
        userId: listFromRequest.userId,
        title: listFromRequest.title,
    });
    if (titleAlreadyExist.length > 0) {
        return res.status(422).json({
            message: 'This title already exist in your lists',
        });
    }
    const ans = await List.create(listFromRequest);
    res.status(201).json(ans);
};

const updateList = async (req, res) => {
    const listFromRequest = req.body;
    const listModelKeys = ['userId', 'title'];
    checkRequest(res, listFromRequest, listModelKeys);
    const ans = await List.findByIdAndUpdate(req.params.listId, req.body, {
        new: true,
    });
    res.status(200).json({
        message: 'list updated !',
        updatedList: ans,
    });
};

const deleteList = async (req, res) => {
    // On supprime d'abord toutes les taches qui sont rattachés à cette liste
    await Todo.deleteMany({ listId: req.params.listId });
    await List.findByIdAndDelete(req.params.listId);
    return res.status(202).json({ message: 'list deleted !' });
};

module.exports.getLists = getLists;
module.exports.insertList = insertList;
module.exports.updateList = updateList;
module.exports.deleteList = deleteList;
