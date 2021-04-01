const {check, validationResult} = require('express-validator');

exports.validateUserDelete = [  
    check('id')    
    .trim()
    .not()
    .isEmpty()
    .withMessage('Invalid user id!')
    .bail()
  ,(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({error: errors.array()[0].msg});
    next();
  }
]