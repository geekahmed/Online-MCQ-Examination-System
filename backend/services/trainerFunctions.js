let QuestionModel = require("../models/questions");
let options = require("../models/option");
let tool = require("./tool");



let createQuestion = (req,res,next)=>{
    if(req.user.type==='TRAINER'){
        req.check('body', `Invalid question!`).notEmpty();
        req.check('subject', 'Enter subject!').notEmpty();
        var errors = req.validationErrors()
        if(errors){
            res.json({
                success : false,
                message : 'مدخلات غير صحيحة!',
                errors : errors
            })
        }
        else {
            var body =  req.body.body;
            var option =  req.body.options;
            var quesimg =  req.body.quesimg;
            var difficulty =  req.body.difficulty;
            var subjectid = req.body.subject;
            var anscount = 0;
            var weightage = req.body.weightage;
            option.map((d,i)=>{
                if(d.isAnswer){
                    anscount=anscount+1;
                }
            })
            console.log(anscount);
            var explanation = req.body.explanation;
                QuestionModel.findOne({ body : body,status:1 },{status:0})
                .then((info)=>{
                    if(!info){
                        options.insertMany(option,(err,op)=>{
                            if(err){
                                console.log(err);
                                res.status(500).json({
                                    success : false,
                                    message : "تعذر إنشاء سؤال جديد!"
                                })
                            }
                            else{
                                var ra=[];
                                console.log(op)
                                op.map((d,i)=>{
                                    if(d.isAnswer){
                                        ra.push(d._id)
                                    }
                                })
                                var tempdata = QuestionModel({
                                    body: body,
                                    explanation : explanation,
                                    quesimg : quesimg,
                                    subject : subjectid,
                                    difficulty :difficulty,
                                    options:op,
                                    createdBy : req.user._id,
                                    anscount:anscount,
                                    weightage : weightage,
                                    rightAnswers:ra
                                })
                                tempdata.save().then(()=>{
                                    res.json({
                                        success : true,
                                        message : `تم إنشاء سؤال جديد بنجاح!`
                                    })
                                }).catch((err)=>{
                                    console.log(err);
                                    res.status(500).json({
                                        success : false,
                                        message : "تعذر إنشاء سؤال جديد!"
                                    })
                                })
                            }
                        })
                    }
                    else{
                        res.json({
                            success : false,
                            message : `هذا السؤال موجود بالفعل!`
                        })
                    }   

                })
            
        }
        
    }

    else{
        res.status(401).json({
            success : false,
            message : "ليس لديك تصريح!"
        })
    }
}


let deleteQuestion = (req,res,next)=>{
    if(req.user.type==='TRAINER'){
        var _id =  req.body._id;
        QuestionModel.findOneAndUpdate({
            _id : _id
        },
        {
            status : 0

        }).then(()=>{
            res.json({
                success: true,
                message :  "تم حذف السؤال"
            })
        }).catch((err)=>{
            res.status(500).json({
                success : false,
                message : "تعذر حذف السؤال"
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


let getAllQuestions = (req,res,next)=>{
    if(req.user.type==='TRAINER'){
        var subject = req.body.subject;
        if(subject.length!==0){
            QuestionModel.find({subject : subject,status : 1},{status : 0})
            .populate({path: 'createdBy', select: 'name'})
            .populate('subject', 'topic')
            .populate('options')
            .exec(function (err, question) {
                if (err){
                    console.log(err)
                    res.status(500).json({
                        success : false,
                        message : "تعذر جلب البيانات"
                    })
                }
                else{
                    res.json({
                        success : true,
                        message : `Success`,
                        data : question
                    })
                }
            })        

        }
        else{
            QuestionModel.find({status : 1},{status : 0})
            .populate({path: 'createdBy', select: 'name'})
            .populate('subject', 'topic')
            .populate('options')
            .exec(function (err, question) {
                if (err){
                    console.log(err)
                    res.status(500).json({
                        success : false,
                        message : "تعذر جلب البيانات"
                    })
                }
                else{
                    res.json({
                        success : true,
                        message : `Success`,
                        data : question
                    })
                }
            })        
        }
        }
    else{
        res.status(401).json({
            success : false,
            message : "ليس لديك تصريح!"
        })
    } 
}   
 




let getSingleQuestion = (req,res,next)=>{
    if(req.user.type==='TRAINER'){
        let _id = req.params._id;
        console.log(_id);
        QuestionModel.find({_id : _id , status : 1},{status : 0})
        .populate({path: 'createdBy', select: 'name'})
        .populate('questions', 'body')
        .populate('subject', 'topic')
        .populate('options')
        .exec(function (err, question) {
            if (err){
                console.log(err)
                res.status(500).json({
                    success : false,
                    message : "تعذر جلب البيانات"
                })
            }
            else{
                if(question.length===0){
                    res.json({
                        success : false,
                        message : `لا يوجد مثل هذا السؤال`,
                    })
                }
                else{
                    res.json({
                        success : true,
                        message : `Success`,
                        data : question
                    })
                }   
            }
        })        
    }
    else{
        res.status(401).json({
            success : false,
            message : "ليس لديك تصريح!"
        })
    }    
}
 
//create test papers

module.exports = { createQuestion, getAllQuestions, getSingleQuestion, deleteQuestion}







