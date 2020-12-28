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
    const kingdom = req.kingdom;
    kingdom.name = req.body.name;
    kingdom.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

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