var redis = require('../util/Redis');    
var co = require('co'); 

module.exports = {
    getId: function(key){
        return new Promise(function(resolve,reject){ 
            var ret = false;
            console.log(1);
            co(function *(){
                console.log('co');
                yield redis.query(['INCRBY', key, 1]).then(function(res){
                    resolve(res);
                }).catch(function(err){
                    reject(err);
                });

            });
            
        });
        
    },
    currentId: function(key){
        var ret = false;
        co(function *(){
            ret = yield redis.query(['GET', key])
        });
        return  ret;
    }
}