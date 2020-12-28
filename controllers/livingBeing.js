const LivingBeing = require("../models/livingBeing");
const { errorHandler } = require("../helpers/dbErrorHandler");

// middlewares rest

exports.livingBeingById = (req, res, next, id) => {
    LivingBeing.findById(id).exec((err, livingbeing) => {
        if (err || !livingbeing) {
            return res.status(404).json({
                error: "LivingBeing does not exist"
            });
        }
        req.livingbeing = livingbeing;
        next();
    });
};

exports.create = (req, res) => {
    const livingbeing = new LivingBeing(req.body);
    livingbeing.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json( { data });
    });
};

exports.read = (req, res) => {
    return res.json(req.livingbeing);
};

exports.update = (req, res) => {
    const livingbeing = req.livingbeing;
    livingbeing.name = req.body.name;
    livingbeing.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.remove = (req, res) => {
    const livingbeing = req.livingbeing;
    livingbeing.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "LivingBeing deleted"
        });
    });
};

exports.list = (req, res) => {
    LivingBeing.find().exec((err, data) => {
        if (err) {
            return res.status.json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};