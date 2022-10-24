const { Router} = require('express');
const {check} =require('express-validator');
const {getUsers, saveUser, updateUser,deleteUser} = require('../controllers/user.controller');
const {validateFields}=require('../middlewares/field-validate');
const router = Router();

router.get('/',getUsers);
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
    check('name',"Name is mandatory").not().isEmpty(),
    check('pwd',"Password is mandatory").not().isEmpty(),
    check('email', "Email is mandatory").isEmail(),
    validateFields,
],
updateUser);
router.delete('/:id',deleteUser);

module.exports = router;
