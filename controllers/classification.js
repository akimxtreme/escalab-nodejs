const Classification = require("../models/classification");
const { errorHandler } = require("../helpers/dbErrorHandler");

// middlewares rest

exports.classificationById = (req, res, next, id) => {
    Classification.findById(id).exec((err, classification) => {
        if (err || !classification) {
            return res.status(404).json({
                error: "Classification does not exist"
            });
        }
        req.classification = classification;
        next();
    });
};

exports.create = (req, res) => {
    const classification = new Classification(req.body);
    classification.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json( { data });
    });
};

exports.read = (req, res) => {
    return res.json(req.classification);
};

exports.update = (req, res) => {
    const classification = req.classification;
    classification.name = req.body.name;
    classification.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.remove = (req, res) => {
    const classification = req.classification;
    classification.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Classification deleted"
        });
    });
};

exports.list = (req, res) => {
    Classification.find().exec((err, data) => {
        if (err) {
            return res.status.json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};