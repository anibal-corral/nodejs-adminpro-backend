const { Router} = require('express');

const { validateJWT } = require('../middlewares/validate-jwt');
const {validateFields} = require('../middlewares/field-validate')
const {getDoctors,getDoctor,saveDoctor,updateDoctor,deleteDoctor} =require('../controllers/doctor.controller');
const { check } = require('express-validator');

const router = Router();

router.get('/',[validateJWT ],getDoctors);
router.get('/:id',[ validateJWT],getDoctor);
router.post('/',
[
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('hospital', 'Hospital is required').not().isEmpty().isMongoId(),
    
    validateFields
],
saveDoctor);

router.put('/:id',
[
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('hospital', 'Hospital is required').not().isEmpty().isMongoId(),
    validateFields
],
updateDoctor);
router.delete('/:id',[validateJWT],deleteDoctor);

module.exports = router;
