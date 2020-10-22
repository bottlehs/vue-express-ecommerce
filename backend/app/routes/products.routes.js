module.exports = (app) => {
  const passport = require("passport");
  const products = require("../controllers/products.controller.js");

  var router = require("express").Router();

  /**
   * @swagger
   * definitions:
   *   Product:
   *     type: object
   *     required:
   *       - title
   *       - content
   *     properties:
   *       title:
   *         type: string
   *       content:
   *         type: string
   *   ResProduct:
   *     type: object
   *     properties:
   *       id:
   *         type: number
   *       usersId:
   *         type: number
   *       name:
   *         type: string
   *       status:
   *         type: string
   *       ipAddress:
   *         type: string
   *       createdAt:
   *         type: string
   *       updateAt:
   *         type: string
   */

  /**
   * @swagger
   * tags:
   *   name: Product
   *   description: 제품
   */

  /**
   * @swagger
   * /api/products:
   *   product:
   *     security:
   *       - bearerToken: []
   *     summary: 제품 등록
   *     description: 제품 등록
   *     tags: [Product]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: param
   *         description: param
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Product'
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/ResProduct'
   *       201:
   *         $ref: '#/components/res/Created'
   *       204:
   *         $ref: '#/components/res/NoContent'
   *       400:
   *         $ref: '#/components/res/BadRequest'
   *       401:
   *         $ref: '#/components/res/Unauthorized'
   *       404:
   *         $ref: '#/components/res/NotFound'
   *       409:
   *         $ref: '#/components/res/Conflict'
   *       500:
   *         $ref: '#/components/res/InternalServerError'
   */

  router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    products.create
  );

  /**
   * @swagger
   * /api/products:
   *   get:
   *     summary: 제품 전체 조회
   *     description: 제품 전체 조회
   *     tags: [Product]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: title
   *         description: title
   *         in: query
   *       - name: page
   *         description: page
   *         in: query
   *       - name: size
   *         description: size
   *         in: query
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/ResProduct'
   *       201:
   *         $ref: '#/components/res/Created'
   *       204:
   *         $ref: '#/components/res/NoContent'
   *       400:
   *         $ref: '#/components/res/BadRequest'
   *       401:
   *         $ref: '#/components/res/Unauthorized'
   *       404:
   *         $ref: '#/components/res/NotFound'
   *       409:
   *         $ref: '#/components/res/Conflict'
   *       500:
   *         $ref: '#/components/res/InternalServerError'
   */
  router.get("/", products.findAll);

  /**
   * @swagger
   * /api/products/{id}:
   *   get:
   *     summary: 제품 단건 조회
   *     description: 제품 단건 조회
   *     tags: [Product]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: ID
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/ResProduct'
   *       201:
   *         $ref: '#/components/res/Created'
   *       204:
   *         $ref: '#/components/res/NoContent'
   *       400:
   *         $ref: '#/components/res/BadRequest'
   *       401:
   *         $ref: '#/components/res/Unauthorized'
   *       404:
   *         $ref: '#/components/res/NotFound'
   *       409:
   *         $ref: '#/components/res/Conflict'
   *       500:
   *         $ref: '#/components/res/InternalServerError'
   */
  router.get("/:id", products.findOne);

  /**
   * @swagger
   * /api/products/{id}:
   *   put:
   *     security:
   *       - bearerToken: []
   *     summary: 게시물 수정
   *     description: 게시물 수정
   *     tags: [Product]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: ID
   *         schema:
   *           type: integer
   *       - name: param
   *         description: param
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Product'
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/ResProduct'
   *       201:
   *         $ref: '#/components/res/Created'
   *       204:
   *         $ref: '#/components/res/NoContent'
   *       400:
   *         $ref: '#/components/res/BadRequest'
   *       401:
   *         $ref: '#/components/res/Unauthorized'
   *       404:
   *         $ref: '#/components/res/NotFound'
   *       409:
   *         $ref: '#/components/res/Conflict'
   *       500:
   *         $ref: '#/components/res/InternalServerError'
   */
  router.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    products.update
  );

  /**
   * @swagger
   * /api/products/{id}:
   *   delete:
   *     security:
   *       - bearerToken: []
   *     summary: 제품 삭제
   *     description: 제품 삭제
   *     tags: [Product]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: ID
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: OK
   *       201:
   *         $ref: '#/components/res/Created'
   *       204:
   *         $ref: '#/components/res/NoContent'
   *       400:
   *         $ref: '#/components/res/BadRequest'
   *       401:
   *         $ref: '#/components/res/Unauthorized'
   *       404:
   *         $ref: '#/components/res/NotFound'
   *       409:
   *         $ref: '#/components/res/Conflict'
   *       500:
   *         $ref: '#/components/res/InternalServerError'
   */
  router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    products.delete
  );

  /**
   * @swagger
   * /api/products:
   *   delete:
   *     security:
   *       - bearerToken: []
   *     summary: 제품 전체 삭제
   *     description: 제품 전체 삭제
   *     tags: [Product]
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: OK
   *       201:
   *         $ref: '#/components/res/Created'
   *       204:
   *         $ref: '#/components/res/NoContent'
   *       400:
   *         $ref: '#/components/res/BadRequest'
   *       401:
   *         $ref: '#/components/res/Unauthorized'
   *       404:
   *         $ref: '#/components/res/NotFound'
   *       409:
   *         $ref: '#/components/res/Conflict'
   *       500:
   *         $ref: '#/components/res/InternalServerError'
   */
  router.delete(
    "/",
    passport.authenticate("jwt", { session: false }),
    products.deleteAll
  );

  app.use("/api/products", router);
};
