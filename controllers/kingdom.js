const Kingdom = require("../models/kingdom");
const { errorHandler } = require("../helpers/dbErrorHandler");

// middlewares rest

exports.kingdomById = (req, res, next, id) => {
    Kingdom.findById(id).exec((err, kingdom) => {
        if (err || !kingdom) {
            return res.status(404).json({
                error: "Kingdom does not exist"
            });
        }
        req.kingdom = kingdom;
        next();
    });
};

exports.create = (req, res) => {
    const kingdom = new Kingdom(req.body);
    kingdom.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json( { data });
    });
};

exports.read = (req, res) => {
    return res.json(req.kingdom);
};


exports.update = (req, res) => {
    const kingdom       = req.kingdom;
    if (req.body.name != undefined) { kingdom.name = req.body.name; }
    if (req.body.description != undefined) { kingdom.description = req.body.description; }
    kingdom.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

/*
exports.update = (req, res) => {
    Kingdom.findOneAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true },
        (err, kingdom) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not authorized to perform this action"
                });
            }
            //kingdom.createdAt = undefined;
            //kingdom.updatedAt = undefined;
            res.json(kingdom);
        }
    );
};
*/

exports.remove = (req, res) => {
    const kingdom = req.kingdom;
    kingdom.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Kingdom deleted"
        });
    });
};

exports.list = (req, res) => {
    Kingdom.find().exec((err, data) => {
        if (err) {
            return res.status.json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};