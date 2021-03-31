const express = require("express");

const { users_list }  = require('../controllers/users/list')
const { users_create }  = require('../controllers/users/create')
const { users_update }  = require('../controllers/users/update')
const { users_delete }  = require('../controllers/users/delete')
const { users_login }  = require('../controllers/users/login')
const { users_reset }  = require('../controllers/users/reset')
const { users_forgot }  = require('../controllers/users/forgot')

const { validateUserCreate }  = require('../middlewares/validations/users_create')
const { validateUserUpdate }  = require('../middlewares/validations/users_update')
const { validateUserDelete }  = require('../middlewares/validations/users_delete')
const { validateUserLogin }  = require('../middlewares/validations/users_login')
const { validateUserReset }  = require('../middlewares/validations/users_reset')
const { validateUserForgot }  = require('../middlewares/validations/users_forgot')

const router = express.Router();

router.post('/users/create', validateUserCreate, users_create);
router.post('/users/update', validateUserUpdate, users_update);
router.post('/users/delete', validateUserDelete, users_delete);
router.post('/users/login', validateUserLogin, users_login);
router.post('/users/reset', validateUserReset, users_reset);
router.post('/users/forgot', validateUserForgot, users_forgot);
router.get('/users/list', users_list);

module.exports = router;
