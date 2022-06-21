const express = require('express');
const router = express.Router();
const Users = require('../controllers/users.controller');
const {authToken} = require('../middlewares/auth');

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users.
 *     tags:
 *           - Usuarios
 *     description: Retrieve a list of users. Can be used  of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       firstname:
 *                         type: string
 *                         description: The user's firstname.
 *                         example: Diego
 *                       lastname:
 *                         type: string
 *                         description: The user's lastname.
 *                         example: Inostroza
 *                       email:
 *                         type: string
 *                         description: The user's email.
 *                         example: diego.inoca@gmail.com
 */

router.route('/api/users').get(Users.find);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Usuario por id.
 *     tags:
 *           - Usuarios
 *     description: Retrieve a list of users. Can be used  of fake users when prototyping or testing an API.
 *     parameters:
 *        - in: path
 *          name: id
 *          type: integer
 *          required: true
 *          description: description of parameter
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                       id:
 *                         type: integer
 *                         description: ID del usuario.
 *                         example: 1
 *                       firstname:
 *                         type: string
 *                         description: Nombre del Usuario.
 *                         example: Test
 *                       lastname:
 *                         type: string
 *                         description: Apellido del usuario.
 *                         example: Test
 *                       username:
 *                         type: string
 *                         description: usuario.
 *                         example: Test
 *                       email:
 *                         type: string
 *                         description: Email del usuario.
 *                         example: test@gmail.com
 */
router.route('/api/users/(:id)').get(Users.findById);

/**
 * @swagger
 * /api/users:
 *   post:
 *      security:
 *          - bearerAuth: [ ]
 *      summary: Servicio para crear usuario
 *      description: Servicio para crear usuario y devuelve el usuario creado
 *      tags:
 *          - Usuarios
 *      requestBody:
 *          content:
 * 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Usuario'
 * 
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          payload:
 *                              $ref: '#/components/schemas/Usuario'
 *                  encoding:
 *                      payload:
 *                          contentType: application/json
 * 
 *      responses:
 *          '200':
 *              description: OK
 * 
 * components:
 *  schemas:
 *      Usuario:
 *          title: Usuario
 *          type: object
 *          properties:
 *              firstname:
 *                  type: string
 *                  description: Nombre
 *              lastname:
 *                  type: string
 *                  description: Apellido
 *              email:
 *                  type: string
 *                  description: email
 *              username:
 *                  type: string
 *                  description: Usuario
 *              password:
 *                  type: string
 *                  description: Contraseña no encriptada
 *          required:
 *              - firstname   
 *              - lastname     
 *              - email    
 *              - username
 *              - password     
 */
router.route('/api/users').post(authToken, Users.create);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *      summary: Servicio para crear usuario
 *      description: Servicio para crear usuario y devuelve el usuario creado
 *      tags:
 *          - Usuarios
 *      parameters:
 *        - in: path
 *          name: id
 *          type: integer
 *          required: true
 *          description: description of parameter
 *      requestBody:
 *          content:
 * 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Usuario'
 * 
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          payload:
 *                              $ref: '#/components/schemas/Usuario'
 *                  encoding:
 *                      payload:
 *                          contentType: application/json
 * 
 *      responses:
 *          '200':
 *              description: OK
 * 
 * components:
 *  schemas:
 *      Usuario:
 *          title: Usuario
 *          type: object
 *          properties:
 *              firstname:
 *                  type: string
 *                  description: Nombre
 *              lastname:
 *                  type: string
 *                  description: Apellido
 *              email:
 *                  type: string
 *                  description: email
 *              username:
 *                  type: string
 *                  description: Usuario
 *              password:
 *                  type: string
 *                  description: Contraseña no encriptada
 *          required:
 *              - firstname   
 *              - lastname     
 *              - email    
 *              - username
 *              - password     
 */
router.route('/api/users/(:id)').put(Users.update);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: [ ]
 *     summary: Eliminar usuario por id
 *     tags:
 *          - Usuarios
 *     description: Servicio para eliminar usuario por ID.
 *     parameters:
 *        - in: path
 *          name: id
 *          type: integer
 *          required: true
 *          description: id de usuario
 *     responses:
 *          200:
 *              description: User was deleted successfully!.
*/
router.route('/api/users/(:id)').delete(authToken, Users.remove);

module.exports = router;