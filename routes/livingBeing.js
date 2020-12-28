const express = require("express");
const router = express.Router();

const {
    create,
    livingBeingById,
    read,
    update,
    remove,
    list
} = require("../controllers/livingBeing");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

// routes
router.get("/living-being/:kingdomId", read);
router.post("/living-being/create/:userId", requireSignin, isAuth, isAdmin, create);
router.put(
    "/living-being/:livingBeingId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);
router.delete(
    "/living-being/:livingBeingId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.get("/living-beings", list);

// params
router.param("livingBeingId", livingBeingById);
router.param("userId", userById);

module.exports = router;

