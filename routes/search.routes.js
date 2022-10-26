const { Router} = require('express');
const {check} =require('express-validator');
const {search,getCollectionDocument} = require('../controllers/search.controller');
const {validateFields}=require('../middlewares/field-validate');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/:value',[ validateJWT],search);
router.get('/collection/:table/:search',[ validateJWT],getCollectionDocument);

module.exports = router;
