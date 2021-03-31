const {check, validationResult} = require('express-validator');

const Users = require("../../models/user");

exports.validateUserForgot = [  
  check('email')
  .custom(async (value, { res }) => {
    await Users.User.findByEmail(value).then(user => {      
      if (user) {        
        if (user.length > 1){
          return Promise.reject();
        }
        if (user[0].status != 3){
         // console.log('update', user[0])
         return Promise.reject('Duplicate E-mail in use');
        }
        else{
          return true;
        } 
      }
      else{
        return Promise.reject('E-mail not in use');
      }
    })
  }).withMessage("Email not exist")
  ,(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.json({error: errors.array()[0].msg});
    next();
  }
]