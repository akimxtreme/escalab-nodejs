const User = require("../models/user");

// middlewares rest 

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            });
        }
        req.profile = user;
        next();
    });
};

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    //return res.json(req.profile);
    return res.json({
        _id: req.profile._id,
        name: req.profile.name,
        email: req.profile.email,
        is_admin: (req.profile.role == 0 ? false : true),
        role: req.profile.role,
        createdAt: req.profile.createdAt,
        updatedAt: req.profile.updatedAt
    });
};

exports.update = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not authorized to perform this action"
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        }
    );
};