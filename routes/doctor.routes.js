const { Router} = require('express');

const { validateJWT } = require('../middlewares/validate-jwt');

const {getDoctors,saveDoctor,updateDoctor,deleteDoctor} =require('../controllers/doctor.controller')

const router = Router();

router.get('/',[ validateJWT],getDoctors);
router.post('/',
[
    
  
],
saveDoctor);
router.put('/:id',
[
  
],
updateDoctor);
router.delete('/:id',[validateJWT],deleteDoctor);

module.exports = router;
