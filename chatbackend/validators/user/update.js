const {body} = require('express-validator');

exports.rules = (()=>{
    return [
        body('firstName').optional().notEmpty(),
        body('lastName').optional().notEmpty(),
        body('gender').optional().notEmpty(),
        body('email').isEmail(),
        body('password').optional().isLength({min:5})
    ]
})();