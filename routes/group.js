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
/**
 * @swagger   
 * /api/group/{id}: 
 *  get:
 *    summary: Read Group - (Leer Grupo)
 *    description: Retorna el objeto Group a partir de un id dado.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: group_id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *         description: A successful response
 *      "400":
 *         description: A bad request response
 */
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
/**
 * @swagger   
 * /api/groups: 
 *  get:
 *    summary: List Group - (Listado de Grupos)
 *    description: Listado de todos los Grupos de Seres Vivos
 *    responses:
 *      "200":
 *         description: A successful response
 *      "400":
 *         description: A bad request response
 */
router.get("/groups", list);

// params
router.param("groupId", groupById);
router.param("userId", userById);

module.exports = router;

