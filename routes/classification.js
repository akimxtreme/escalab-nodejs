const express = require("express");
const router = express.Router();

const {
    create,
    classificationById,
    read,
    update,
    remove,
    list
} = require("../controllers/classification");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

// routes
router.get("/classification/:classificationId", read);
router.post("/classification/create/:userId", requireSignin, isAuth, isAdmin, create);
router.put(
    "/classification/:classificationId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);
router.delete(
    "/classification/:classificationId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.get("/classifications", list);

// params
router.param("classificationId", classificationById);
router.param("userId", userById);

module.exports = router;

