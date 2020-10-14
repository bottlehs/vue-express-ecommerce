module.exports = (app) => {
  const passport = require("passport");
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  /**
   * @swagger
   * definitions:
   *   Tutorial:
   *     type: object
   *     required:
   *       - title
   *       - description
   *     properties:
   *       title:
   *         type: string
   *       description:
   *         type: string
   *       published:
   *         type: boolean
   *   ResTutorial:
   *     type: object
   *     properties:
   *       title:
   *         type: string
   *       description:
   *         type: string
   *       published:
   *         type: boolean
   *       createdAt:
   *         type: string
   *       updateAt:
   *         type: string
   */

  /**
   * @swagger
   * tags:
   *   name: Tutorial
   *   description: 튜토리얼
   */

  /**
   * @swagger
   * /api/tutorials:
   *   post:
   *     security:
   *       - bearerToken: []
   *     summary: 튜토리얼 등록
   *     description: 튜토리얼 등록
   *     tags: [Tutorial]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: param
   *         description: param
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Tutorial'
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/ResTutorial'
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
    tutorials.create
  );

  /**
   * @swagger
   * /api/tutorials:
   *   get:
   *     summary: 튜토리얼 전체 조회
   *     description: 튜토리얼 전체 조회
   *     tags: [Tutorial]
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
   *             $ref: '#/definitions/ResTutorial'
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
  router.get("/", tutorials.findAll);

  /**
   * @swagger
   * /api/tutorials/published:
   *   get:
   *     summary: 퍼블리싱된 튜토리얼 전체 조회
   *     description: 퍼블리싱된 튜토리얼 전체 조회
   *     tags: [Tutorial]
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/ResTutorial'
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
  router.get("/published", tutorials.findAllPublished);

  /**
   * @swagger
   * /api/tutorials/{id}:
   *   get:
   *     summary: 튜토리얼 단건 조회
   *     description: 튜토리얼 단건 조회
   *     tags: [Tutorial]
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
   *           $ref: '#/definitions/ResTutorial'
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
  router.get("/:id", tutorials.findOne);

  /**
   * @swagger
   * /api/tutorials/{id}:
   *   put:
   *     security:
   *       - bearerToken: []
   *     summary: 튜토리얼 수정
   *     description: 튜토리얼 수정
   *     tags: [Tutorial]
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
   *           $ref: '#/definitions/Tutorial'
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/ResTutorial'
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
    tutorials.update
  );

  /**
   * @swagger
   * /api/tutorials/{id}:
   *   delete:
   *     security:
   *       - bearerToken: []
   *     summary: 튜토리얼 삭제
   *     description: 튜토리얼 삭제
   *     tags: [Tutorial]
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
    tutorials.delete
  );

  /**
   * @swagger
   * /api/tutorials:
   *   delete:
   *     security:
   *       - bearerToken: []
   *     summary: 튜토리얼 전체 삭제
   *     description: 튜토리얼 전체 삭제
   *     tags: [Tutorial]
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
    tutorials.deleteAll
  );

  app.use("/api/tutorials", router);
};
