var redis = require('redis');    

module.exports= {
  _connect: function(dbname){
        //创建连接    
        var client = redis.createClient();    
        return client;
    },
    query: function (param_array){
        console.log('redis query');
        var self = this;
        return  new Promise(function(resolve,reject){
            if(arguments.length < 1){
                reject("param error");
                return ;
            }
            var client = self._connect();
            var command = param_array.splice(0,1);
            client[command](param_array, function(error, replies) {
                // 关闭链接
          
                if(error) {
                    console.log(error);
                    reject(error);
                } else {
                    resolve(replies);
                }
                client.quit();
            });
        });
        
    }
}