var db = require('../util/DB.js');    

module.exports = {
    createUser: function(param){

    },
    getUserInfo: function (param){
        return new Promise(function(resolve, reject){
            function * loop (){
                var ret = yield db.query("select * from user");
                return ret;
            }
            var gen = loop();
            var next = gen.next();
            next.value.then(function(res){
                var _next = gen.next(res);
                resolve(_next.value);
            });
        })
    }
}