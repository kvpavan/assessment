const {check, validationResult} = require('express-validator');
const Users = require("../../models/user");
updateCheck = null;
exports.validateUserCreate = [
  check('email')
  .custom(async (value, {res}) => {
    await Users.User.findByEmail(value).then(user => {
      
      if (user) {
        
        if (user.length > 1){
          return Promise.reject("Duplicate Email exist");
        }
        if (user[0].status != 3){
         // console.log('update', user[0])
          updateCheck = user[0].uuid;
          return true;
        }
        else{
          return Promise.reject("Email already exist");
        } 
      }
    })
  }).withMessage("Email already taken"),
  check('password')
  .trim()
  .not()
  .isEmpty()
,(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({status: "error", message: errors.array()[0].msg});
    if(updateCheck){
      req.body.updateCheck = true;
      req.body.id = updateCheck;
    }
    next();
  }
]