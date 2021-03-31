const {check, validationResult} = require('express-validator');

exports.validateUserLogin = [  
  check('email')    
  .trim()
  .isEmail()
  .withMessage('Please enter valid email!')
  .bail(),
  check('password')    
  .trim()
  .not()
  .isEmpty()
  .withMessage('Please enter password!')
  .bail()
  ,(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.json({error: errors.array()[0].msg});
    next();
  }
]