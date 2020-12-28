const express = require("express");
const router = express.Router();

const {
    create,
    groupById,
    read,
    update,
    remove,
    list
} = require("../controllers/group");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

// routes
router.get("/group/:groupId", read);
router.post("/group/create/:userId", requireSignin, isAuth, isAdmin, create);
router.put(
    "/group/:groupId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);
router.delete(
    "/group/:groupId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.get("/groups", list);

// params
router.param("groupId", groupById);
router.param("userId", userById);

module.exports = router;

