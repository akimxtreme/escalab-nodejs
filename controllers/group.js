const Group = require("../models/group");
const { errorHandler } = require("../helpers/dbErrorHandler");

// middlewares rest

exports.groupById = (req, res, next, id) => {
    Group.findById(id).exec((err, group) => {
        if (err || !group) {
            return res.status(404).json({
                error: "Group does not exist"
            });
        }
        req.group = group;
        next();
    });
};

exports.create = (req, res) => {
    const group = new Group(req.body);
    group.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json( { data });
    });
};

exports.read = (req, res) => {
    return res.json(req.group);
};

exports.update = (req, res) => {
    const group = req.group;
    if (req.body.name != undefined) { group.name = req.body.name; }
    if (req.body.description != undefined) { group.description = req.body.description; }
    if (req.body.kingdom != undefined) { group.kingdom = req.body.kingdom; }
    group.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.remove = (req, res) => {
    const group = req.group;
    group.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Group deleted"
        });
    });
};

exports.list = (req, res) => {
    Group.find().exec((err, data) => {
        if (err) {
            return res.status.json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};