
var t = require("./model/idalloc");
var promise = t.getId("idalloc_story");
promise.then(function(result){
    console.log(result);
})

// var redis = require('./util/Redis.js');   
// var co = require('co'); 
// co(function *(){
//     console.log(1);
//     var ret = yield redis.query(['INCRBY','idalloc_story',1])

//     console.log('aa');
//     console.log(ret);
// });


// var db = require('./util/DB.js');    

// console.log(db);

// function * p(){
//     console.log(123);
//     yield db.query("select * from user").then(function(){
//         console.log(arguments);
//     }).catch(function(){
//         console.log("catch");
//     });

//     console.log(456);


// }
// var gen = p();
// gen.next();
// gen.next();


