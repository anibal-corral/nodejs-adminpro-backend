const { Router} = require('express');
// const {check} =require('express-validator');
const {uploadFile} = require('../controllers/upload.controller');
// const {validateFields}=require('../middlewares/field-validate');
const { validateJWT } = require('../middlewares/validate-jwt');
const expressFileUpload = require('express-fileupload');
const router = Router();
router.use(expressFileUpload());
// router.post('/:type/:id',[ validateJWT],uploadFile);
router.put('/:type/:id',[ validateJWT],uploadFile);

module.exports = router;
