const {check, validationResult} = require('express-validator');
const Users = require("../../models/user");
updateCheck = null;
exports.validateUserUpdate = [
  check('email').exists().custom(async (value,  { req }) => {
    var errors = [];
    await Users.User.findByEmail(value, req.body.id).then(user => {
        if (user) {
          if (user.length > 1){
            return Promise.reject();
          }
          if (user[0].status != 3){
            updateCheck = user[0].uuid;
            return true;
          }
          else{            
            console.log('status 2')
            return Promise.reject();
          }         
        }
        else{
            return true;
        }
      })
      .catch(err => {
        console.log('USERS_UPDATE_ERR', err)
        res.json({status: "error", message: "USERS_UPDATE_ERR"})
      })
  
   
    
  }).withMessage('Email already exist!'),
  check('password').exists().custom((value, { req }) => {
    if (value !== req.body.confirm_password) {
      return false;
    }
    return true;
  }).withMessage('Check password!'),
  check('name')  
    .exists()  
    .trim()
    .not()
    .isEmpty()
    .withMessage('Invalid name!')
,(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({status: "error", message: errors.array()[0].msg});
    if(updateCheck){      
      req.body.id = updateCheck;
    }
    next();
  }
]