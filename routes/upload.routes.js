const { Router} = require('express');
// const {check} =require('express-validator');
const {uploadFile,getFile} = require('../controllers/upload.controller');
// const {validateFields}=require('../middlewares/field-validate');
const { validateJWT } = require('../middlewares/validate-jwt');
const expressFileUpload = require('express-fileupload');
const router = Router();
router.use(expressFileUpload());
// router.post('/:type/:id',[ validateJWT],uploadFile);
router.put('/:type/:id',[ ],uploadFile);
router.get('/:type/:img', getFile);

module.exports = router;
