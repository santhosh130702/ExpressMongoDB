


var exp = require('express');
var dot = require('dotenv');
var mon = require('mongoose');
var bparser = require('body-parser');
var bparserInit = bparser.urlencoded({extended: false});
var app = exp();
//mention the db name
mon.connect("mongodb://127.0.0.1:27017/local?directConnection=true&serverSelectionTimeoutMS=2000&appName=ExpresstoMongo")
.then(()=>{console.log('connected to the db..') }).catch(
    ()=>{console.log("unable to connect check the url")}
)
 
//define the structure of the collection
const userSchema = { userID:String,password:String,emailId:String}
 
//link the structure with the name of the actual collection in the database
//model (<collectionName>,<Schemaname or structureofthecollection> )
var UserData=mon.model('Users',userSchema);
 
//prepare data to be inserted in the collection
// var udata= new UserData({'userID':'122','password':'123','emailId':'ansh@gmail.com' })
 
// //insert data into collection. use save() function to insert data
// udata.save().then((data)=>console.log("Inserted successfully")).catch
// ((error)=>{
//     console.log(error);
// })
//already created collection will bw thr. lowercase collection only will be added.
//new collection of users is created in small case
 
//to retrieve all the records else error
// UserData.find().then((data)=>console.log(data)).catch((error)=>console.log(error))
 
app.listen(8010,function(error){
    if(error!=undefined){
        console.log(error.message)
    }
    else{
        console.log('connect to port 8010.waiting for request')
        console.log('on the browser, visit http://localhost:8010/')}
})
 
function addNewUser(request,response){
    var udata= new UserData({'userID':request.body.uid,'password':request.body.password,
    'emailId':request.body.emailId })
    //while providing new user u should give the uid ,password and emailId as the name in the form encode
    udata.save().then((data)=>{console.log("Inserted successfully");
    response.send("inserted data successfully");
})
    .catch((error)=>{
        console.log(error);
        response.send("unable to insert");
    })    
}
app.post('/addUser',bparserInit,addNewUser);
 
function getAllUsers(request,response){
UserData.find().then((data)=>{console.log(data);
response.send(data);
}).catch(
    (error)=>{console.log(error);
    response.send('could not retrieve the data');})
}
 
app.get('/allUsers',getAllUsers);


function UpdateUser(request,response){
    var udata=UserData.findOne({'userID':request.body.uid});
     udata.updateOne({$set:{'password':request.body.password,'emailId':request.body.emailId}}).then((data)=>{
         response.send(data);
     }).catch((err)=>{
         console.log(err);
     })
 }
 app.put('/UpdateUser',bparserInit,UpdateUser);

 function deleteUser(request,response){
 
    UserData.deleteOne({userID:request.body.uid}).then((data)=>{
        response.send(data);
    }).catch((err)=>{
        console.log(err);
    })
}
app.delete('/deleteUser',bparserInit,deleteUser);
function loginUser(request,response){
    let userID=request.body.uid;
    let password=request.body.password;
    UserData.find({userID:userID,password:password}).then((data)=>{
        response.send(data);
    }).catch((err)=>{
        console.log(err);
    })
  }
  app.get('/loginUser',bparserInit,loginUser);
