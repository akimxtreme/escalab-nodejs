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
/**
 * @swagger   
 * /api/living-being/{id}: 
 *  get:
 *    summary: Read LivingBeing - (Leer Ser Vivo)
 *    description: Retorna el objeto LivingBeing a partir de un id dado.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: living_being_id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *         description: A successful response
 *      "400":
 *         description: A bad request response
 */
router.get("/living-being/:livingBeingId", read);
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
/**
 * @swagger   
 * /api/living-beings: 
 *  get:
 *    summary: List Living Being - (Listado de Seres Vivos)
 *    description: Listado de todos los Seres Vivos
 *    responses:
 *      "200":
 *         description: A successful response
 *      "400":
 *         description: A bad request response
 */
router.get("/living-beings", list);

// params
router.param("livingBeingId", livingBeingById);
router.param("userId", userById);

module.exports = router;

