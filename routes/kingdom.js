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
/**
 * @swagger   
 * /api/kingdom/{id}: 
 *  get:
 *    summary: Read Kingdom - (Leer Reino)
 *    description: Retorna el objeto Kingdom a partir de un id dado.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: kingdom_id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *         description: A successful response
 *      "400":
 *         description: A bad request response
 */
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
/**
 * @swagger   
 * /api/kingdoms: 
 *  get:
 *    summary: List Kingdoms - (Listado de Reinos)
 *    description: Listado de todos los Reinos de Seres Vivos
 *    responses:
 *      "200":
 *         description: A successful response
 *      "400":
 *         description: A bad request response
 */
router.get("/kingdoms", list);

// params
router.param("kingdomId", kingdomById);
router.param("userId", userById);

module.exports = router;

