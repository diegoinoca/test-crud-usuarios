const express = require('express');
const router = express.Router();
const Profile = require('../controllers/profile.controller');
const multer = require('multer');


/**
 * @swagger
 * /api/profile/photo:
 *   post:
 *      summary: Servicios para guardar foto de un usuario
 *      description:  El servicio retorno si se guardo correctamente la imagen o falló
 *      tags:
 *          - Perfil
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/Profile'
 * 
 *      responses:
 *          '200':
 *              description: OK
 * 
 * components:
 *  schemas:
 *      Profile:
 *          title: Profile
 *          type: object
 *          properties:
 *              image:
 *                  type: string
 *                  format: binary
 *                  description: Imagen
 *              id:
 *                  type: integer
 *                  description: id
 *          required:
 *              - image   
 *              - id     
 */

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

var upload = multer({ storage: storage });
router.route('/api/profile/photo').post(upload.single('image'),Profile.profilePhoto);

module.exports = router;
