const { Router} = require('express');
const {check} =require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const {validateFields} = require('../middlewares/field-validate')

const {getHospitals,saveHospital,updateHospital,deleteHospital} =require('../controllers/hospital.controller')

const router = Router();

router.get('/',[ validateJWT],getHospitals);
router.post('/',
[
    validateJWT,
    check('name',"Name is required").not().isEmpty(),
    validateFields
  
],
saveHospital);
router.put('/:id',
[validateJWT,
    check('name',"Name is required").not().isEmpty(),
    validateFields
],
updateHospital);
router.delete('/:id',[
    validateJWT,
    check('name',"Name is required").not().isEmpty(),
    validateFields
],deleteHospital);

module.exports = router;
