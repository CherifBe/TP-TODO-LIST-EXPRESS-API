const List = require('../models/list.model');
const Todo = require('../models/todo.model');

const getLists = async (req, res) => {
    const getListsByUserId = await List.find({ userId: req.user.userId });
    res.status(200).json(getListsByUserId);
};

const insertList = async (req, res) => {
    const listFromRequest = req.body;
    const listModelKeys = ['userId', 'title']; // TODO: Vérifier en base si titre unique avec ce même utilisateur
    const isEveryKeyInRequest = Object.keys(listFromRequest).every((key) =>
        listModelKeys.includes(key)
    );
    if (!isEveryKeyInRequest) {
        return res.status(422).json({
            message: "Keys didn't correspond",
        });
    }
    const ans = await List.create(listFromRequest);
    res.status(201).json(ans);
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
    // On supprime d'abord toutes les taches qui sont rattachés à cette liste
    await Todo.deleteMany({ listId: req.params.listId });
    await List.findByIdAndDelete(req.params.listId);
    return res.status(202).json({ message: 'list deleted !' });
};

module.exports.getLists = getLists;
module.exports.insertList = insertList;
module.exports.updateList = updateList;
module.exports.deleteList = deleteList;
