const {check, validationResult} = require('express-validator');
updateCheck = null;
exports.validateUserReset = [
  check('password')
  .custom(async (value, { req }) => {     
      if (value !== req.body.c_password || value.length == 0) {
        return Promise.reject('check the password you entered');
      }
      else{
          return true;
      }
  }).withMessage("Check Password"),
  check('token')
  .trim()
  .not()
  .isEmpty() 
  .withMessage('Invalid URL!')
,(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({error: errors.array()[0].msg});
    next();
  }
]