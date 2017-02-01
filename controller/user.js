var User = require("../model/user");


module.exports = {
    profile: function *(){

        var user_info = null;
        var modelRes = null;
        var promise = User.getUserInfo();

        yield promise.then(function(res){
            modelRes = res;
        });
        
        this.body = modelRes;
       
    },
    read: function *(next){
        yield this.render('story/read.jade');
    }

}

