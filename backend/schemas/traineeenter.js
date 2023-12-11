var mongoose = require("mongoose");
var traineeschema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    userid:{
        type : String,
        required: true

    },
    testid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TestPaperModel',
        required : true
    }
})

module.exports  = traineeschema;