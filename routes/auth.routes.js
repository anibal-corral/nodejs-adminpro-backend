const { Router} = require('express');
const {check} =require('express-validator');
const { login } = require('../controllers/auth.controller');
const {validateFields}=require('../middlewares/field-validate');
const router = Router();
router.post('/',[
   check('pwd',"Password is mandatory").not().isEmpty(),
   check('email', "Email is mandatory").isEmail(),
   validateFields,
],login);

// router.get('/',getUsers);
// router.post('/',
// [
//     check('name',"Name is mandatory").not().isEmpty(),
//     check('pwd',"Password is mandatory").not().isEmpty(),
//     check('email', "Email is mandatory").isEmail(),
//     validateFields,
// ],
// saveUser);
// router.put('/:id',
// [
//     check('name',"Name is mandatory").not().isEmpty(),
//     check('pwd',"Password is mandatory").not().isEmpty(),
//     check('email', "Email is mandatory").isEmail(),
//     validateFields,
// ],
// updateUser);
// router.delete('/:id',deleteUser);

module.exports = router;
