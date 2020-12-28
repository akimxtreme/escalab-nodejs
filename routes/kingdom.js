const express = require("express");
const router = express.Router();

const {
    create,
    kingdomById,
    read,
    update,
    remove,
    list
} = require("../controllers/kingdom");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

// routes
router.get("/kingdom/:kingdomId", read);
router.post("/kingdom/create/:userId", requireSignin, isAuth, isAdmin, create);
router.put(
    "/kingdom/:kingdomId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);
router.delete(
    "/kingdom/:kingdomId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.get("/kingdoms", list);

// params
router.param("kingdomId", kingdomById);
router.param("userId", userById);

module.exports = router;

