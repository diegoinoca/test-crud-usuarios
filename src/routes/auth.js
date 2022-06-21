const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth.controller');

/**
 * @swagger
 * /api/auth:
 *  post:
 *      summary: Login de usuario
 *      tags:
 *          - Autenticación
 *      requestBody:
 *          content:
 * 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Auth'
 * 
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          payload:
 *                              $ref: '#/components/schemas/Auth'
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
 *      Auth:
 *          title: Usuario
 *          type: object
 *          properties:
 *              user:
 *                  type: string
 *                  description: Usuario o Email
 *              password:
 *                  type: string
 *                  description: Contraseña no encriptada
 *          required:
 *              - user   
 *              - password                
 */

router.route('/api/auth').post(Auth.login);


/**
 * @swagger
 * /api/auth/token:
 *  post:
 *      summary: Servicio sólo para crear token para user admin
 *      description: Servicio devuelve sólo el token con el que se pueden gatillar los servicios restringidos.
 *      tags:
 *          - Autenticación
 *      requestBody:
 *          content:
 * 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Auth'
 * 
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          payload:
 *                              $ref: '#/components/schemas/Auth'
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
 *      Auth:
 *          title: Auth
 *          type: object
 *          properties:
 *              user:
 *                  type: string
 *                  description: Usuario o Email
 *              password:
 *                  type: string
 *                  description: Contraseña no encriptada
 *          required:
 *              - user   
 *              - password                
 */
router.route('/api/auth/token').post(Auth.createAuthToken);

module.exports = router;
