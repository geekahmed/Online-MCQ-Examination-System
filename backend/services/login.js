let UserModel = require("../models/user");
var passport = require("../services/passportconf");
var jwt = require('jsonwebtoken');
var config = require('config');
const jwtSecret = process.env.JWTSECRETKEY || 'Examination Portal Application'



let userlogin = (req,res,next)=>{
    req.check('userid', ` Invalid User ID`).notEmpty();
    req.check('password','Invalid password').isLength({min : 5,max :10});
    var errors = req.validationErrors()
    if(errors){
        res.json({
            success : false,
            message : 'مدخلات غير صحيحة',
            errors : errors
        })
    }else{
        passport.authenticate('login',{session:false},(err,user,info)=>{
            
            if(err || !user){
               res.json(info);
            }
            else{
                req.login({_id:user._id}, {session: false}, (err) => {
                    if (err) {
                        res.json({
                            success: false,
                            message: "خطأ في الخادم!"
                        });
                    }
        
                    var token = jwt.sign({_id:user._id},jwtSecret,{expiresIn: 5000000});
                    res.json({
                        success: true,
                        message: "login successful",
                        user: {
                            name : user.name,
                            type: user.type,
                            _id : user._id,
                            userid : user.userid,
                            contact : user.contact
                        },
                        token: token
                    });
                });
            }
            })(req,res,next);     
    }
        
}



     
module.exports = { userlogin };

