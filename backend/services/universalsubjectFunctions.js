//view all subjects and single subject
let SubjectModel = require("../models/subject");


let createEditsubject = (req,res,next)=>{
    var _id = req.body._id || null;
    if(req.user.type==='ADMIN'){
    req.check('topic', `invalid topic`).notEmpty();
    var errors = req.validationErrors()
    if(errors){
        res.json({
            success : false,
            message : 'مدخلات غير صحيحةs',
            errors : errors
        })
    }
    else {
        var topic =  req.body.topic;
        if(_id!=null){
            SubjectModel.findOneAndUpdate({
                _id : _id,

            },
            {
                topic : topic,
            }).then(()=>{
                res.json({
                    success: true,
                    message :  "تم تغيير اسم الموضوع"
                })
            }).catch((err)=>{
                res.status(500).json({
                    success : false,
                    message : "تعذر تغيير اسم الموضوع"
            })
        })

    }
        else{   
            SubjectModel.findOne({topic : topic}).then((info)=>{
                if(!info){
                    var tempdata = SubjectModel({
                        topic : topic,
                        createdBy : req.user._id
                    })
                    tempdata.save().then(()=>{
                        res.json({
                            success : true,
                            message : `تم إنشاء موضوع جديد بنجاح!`
                        })
                    }).catch((err)=>{
                        console.log(err);
                        res.status(500).json({
                            success : false,
                            message : "غير قادر على إنشاء موضوع جديد!"
                        })
                    })
                }
                else{
                    res.json({
                        success : false,
                        message : `هذا الموضوع موجود بالفعل!`
                    })
                }   

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




            

let getAllSubjects = (req,res,next)=>{
    SubjectModel.find({status : 1},{createdAt: 0, updatedAt : 0})
    .populate('createdBy', 'name')
    
    .exec(function (err, subject) {
        if (err){
            console.log(err)
            res.status(500).json({
                success : false,
                message : "Unable to fetch data"
            })
        }
        else{
            res.json({
                success : true,
                message : `Success`,
                data : subject
            })   
        }
    })        

}

let getSingleSubject = (req,res,next)=>{
    let id = req.params._id;
    console.log(id);
    SubjectModel.find({_id: id},{createdAt: 0, updatedAt : 0,status : 0})
    .populate('createdBy', 'name')
    .exec(function (err, subject) {
        if (err){
            console.log(err)
            res.status(500).json({
                success : false,
                message : "Unable to fetch data"
            })
        }
        else{
            res.json({
                success : true,
                message : `Success`,
                data : subject
            })   
        }
    })        
}

    module.exports = { createEditsubject ,getAllSubjects, getSingleSubject}
    
