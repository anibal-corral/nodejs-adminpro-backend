const { Router} = require('express');
const {check} =require('express-validator');
const {getUsers,getUser, saveUser, updateUser,deleteUser} = require('../controllers/user.controller');
const {validateFields}=require('../middlewares/field-validate');
const { validateJWT, validateAdminRole,validateAdminRoleOrSameUser } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/',[ ],getUsers);
router.get('/:id',[ ],getUser);
router.post('/',
[
    
    check('name',"Name is mandatory").not().isEmpty(),
    check('pwd',"Password is mandatory").not().isEmpty(),
    check('email', "Email is mandatory").isEmail(),
    validateFields,
],
saveUser);
router.put('/:id',
[
    validateJWT,
    validateAdminRoleOrSameUser,
    check('name',"Name is mandatory").not().isEmpty(),
    // check('pwd',"Password is mandatory").not().isEmpty(),
    check('email', "Email is mandatory").isEmail(),
    validateFields,
    
],
updateUser);
router.delete('/:id',[validateJWT,validateAdminRole],deleteUser);

module.exports = router;
