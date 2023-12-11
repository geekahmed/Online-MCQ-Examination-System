let UserModel = require("../models/user");
let tool = require("./tool");

let trainerRegister = (req,res,next)=>{
    var _id = req.body._id || null;
    if(req.user.type==='ADMIN'){
        req.check('name', `Invalid name`).notEmpty();
        if(_id==null){
            req.check('password','Invalid password').isLength({min : 5,max :10});
            req.check('userid', ` Invalid userid`).notEmpty();
        }
        req.check('contact','Invalid contact number').isLength({min : 13,max :13}).isNumeric({no_symbols: false});
        var errors = req.validationErrors()
        if(errors){
            res.json({
                success : false,
                message : 'مدخلات غير صحيحة',
                errors : errors
            })
        }
        else {
            // var rank = req.body.rank;
            var name =  req.body.name;
            var password = req.body.password;
            var userid =  req.body.userid;
            var contact = req.body.contact;
            if(_id!=null){
                UserModel.findOneAndUpdate({
                    _id : _id,
                    status : 1
                },
                { 
                    name : name,
                    contact  : contact
                }).then(()=>{
                    res.json({
                        success : true,
                        message : `Trainer's Profile updated successfully!`
                    })
                }).catch((err)=>{
                    res.status(500).json({
                        success : false,
                        message : "Unable to update Trainer's Profile"
                    })
                })
            }
            else{
                UserModel.findOne({'userid': userid,status:1}).then((user)=>{
                    if(!user){
                        tool.hashPassword(password).then((hash)=>{
                            var tempdata = new UserModel({
                                // rank: rank,
                                name : name,
                                password : hash,
                                userid : userid,
                                contact  : contact,
                                createdBy : req.user._id
                            })
                            tempdata.save().then(()=>{
                                res.json({
                                    success : true,
                                    message : `تم إنشاء الملف التعريفي للمدرب بنجاح!`
                                })
                            }).catch((err)=>{
                                res.status(500).json({
                                    success : false,
                                    message : "تعذر إنشاء ملف تعريف المدرب"
                                })
                            })
                        }).catch((err)=>{
                            res.status(500).json({
                                success : false,
                                message : "تعذر إنشاء ملف تعريف المدرب"
                            })
                        })
                        
                        
                    }
                    else{
                        res.json({
                            success : false,
                            message : `هذا المعرف موجود بالفعل!`
                        })
                    }
                }).catch((err)=>{
                    res.status(500).json({
                        success : false,
                        message : "تعذر إنشاء ملف تعريف المدرب"
                    })
                }) 
            }
                       
        }
    }
    else{
        res.status(401).json({
            success : false,
            message : "ليس لديك تصريح!"
        })
    }
}

let removeTrainer = (req,res,next)=>{
    if(req.user.type==='ADMIN'){
        var _id =  req.body._id;
        UserModel.findOneAndUpdate({
            _id : _id
        },
        {
            status : 0

        }).then(()=>{
            res.json({
                success: true,
                message :  "تمت إزالة الحساب"
            })
        }).catch((err)=>{
            res.status(500).json({
                success : false,
                message : "غير قادر على إزالة الحساب"
            })
        })
    }
    else{
        res.status(401).json({
            success : false,
            message : "ليس لديك تصريح"
        })
    } 
}







let getAllTrainers = (req,res,next)=>{
    if(req.user.type==='ADMIN'){
        UserModel.find({type: 'TRAINER', status : 1},{ password: 0, type: 0,createdBy : 0,status : 0 }).then((info)=>{
            res.json({
                success : true,
                message : `Success`,
                data : info
            })
        }).catch((err)=>{
            res.status(500).json({
                success : false,
                message : "Unable to fetch data"
            })
        })
    }
    else{
        res.status(401).json({
            success : false,
            message : "ليس لديك تصريح!"
        }) 
    }
}



let getSingleTrainer = (req,res,next)=>{
    if(req.user.type==='ADMIN'){
        let _id = req.params._id;
        UserModel.find({_id : _id,status : 1},{password: 0, type: 0, createdBy : 0,status : 0}).then((info)=>{
            if(info.length === 0){
                res.json({
                    success : false,
                    message : `هذا الحساب غير موجود!`,
                
                })
            }
            else{
                res.json({
                    success : true,
                    message : `Success`,
                    data : info
                })

            }
           
        }).catch((err)=>{
            res.status(500).json({
                success : false,
                message : "Unable to fetch data"
            })
        })
    }
    else{
        res.status(401).json({
            success : false,
            message : "ليس لديك تصريح!"
        })
    }    
}







module.exports = { trainerRegister, getAllTrainers, getSingleTrainer, removeTrainer }