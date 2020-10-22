module.exports = (app) => {
  const passport = require("passport");
  const carts = require("../controllers/carts.controller.js");

  var router = require("express").Router();

  /**
   * @swagger
   * definitions:
   *   Cart:
   *     type: object
   *     required:
   *       - title
   *       - content
   *     properties:
   *       title:
   *         type: string
   *       content:
   *         type: string
   *   ResCart:
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
   *   name: Cart
   *   description: 장바구니
   */

  /**
   * @swagger
   * /api/carts:
   *   cart:
   *     security:
   *       - bearerToken: []
   *     summary: 장바구니 등록
   *     description: 장바구니 등록
   *     tags: [Cart]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: param
   *         description: param
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Cart'
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/ResCart'
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
    carts.create
  );

  /**
   * @swagger
   * /api/carts:
   *   get:
   *     summary: 장바구니 전체 조회
   *     description: 장바구니 전체 조회
   *     tags: [Cart]
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
   *             $ref: '#/definitions/ResCart'
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
  router.get("/", carts.findAll);

  /**
   * @swagger
   * /api/carts/{id}:
   *   get:
   *     summary: 장바구니 단건 조회
   *     description: 장바구니 단건 조회
   *     tags: [Cart]
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
   *           $ref: '#/definitions/ResCart'
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
  router.get("/:id", carts.findOne);

  /**
   * @swagger
   * /api/carts/{id}:
   *   put:
   *     security:
   *       - bearerToken: []
   *     summary: 게시물 수정
   *     description: 게시물 수정
   *     tags: [Cart]
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
   *           $ref: '#/definitions/Cart'
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/ResCart'
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
    carts.update
  );

  /**
   * @swagger
   * /api/carts/{id}:
   *   delete:
   *     security:
   *       - bearerToken: []
   *     summary: 장바구니 삭제
   *     description: 장바구니 삭제
   *     tags: [Cart]
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
    carts.delete
  );

  /**
   * @swagger
   * /api/carts:
   *   delete:
   *     security:
   *       - bearerToken: []
   *     summary: 장바구니 전체 삭제
   *     description: 장바구니 전체 삭제
   *     tags: [Cart]
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
    carts.deleteAll
  );

  app.use("/api/carts", router);
};
