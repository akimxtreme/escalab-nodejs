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
/**
 * @swagger   
 * /api/classification/{id}: 
 *  get:
 *    summary: Read Classification - (Leer Clasificación)
 *    description: Retorna el objeto Classification a partir de un id dado.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: classification_id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *         description: A successful response
 *      "400":
 *         description: A bad request response
 */
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
/**
 * @swagger   
 * /api/classifications: 
 *  get:
 *    summary: List Classification - (Listado de Clasificaciones)
 *    description: Listado de todas las Clasificaciones de Seres Vivos
 *    responses:
 *      "200":
 *         description: A successful response
 *      "400":
 *         description: A bad request response
 */
router.get("/classifications", list);

// params
router.param("classificationId", classificationById);
router.param("userId", userById);

module.exports = router;

