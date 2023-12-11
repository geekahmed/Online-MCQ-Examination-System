var mongoose = require("mongoose");
var config = require('config');
let tool = require("./tool")

const dbConnectionString = process.env.DATABASECONNECTIONSTRING || ''
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;


//database connection
mongoose.Promise = global.Promise;
const options = {
  autoIndex: false, 
  reconnectTries: 100,
  reconnectInterval: 500, 
  poolSize: 10, 
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useFindAndModify :  false
};

mongoose.connect(dbConnectionString,options).then(()=>{
    console.log("connected to mongoDB");
    // tool.createadmin();
}).catch((err)=>{
    console.log("Error connecting to database",err);
})


module.exports=mongoose;