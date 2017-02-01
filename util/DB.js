var mysql = require('mysql');    
const DEFAULT_DB_NAME = 'bintreestory';    
const DB_USER_NAME = 'root';
const DB_PASSWD = 'root';
//https://www.npmjs.com/package/sqlstring
//https://www.npmjs.com/package/node-mysql
module.exports= {
    connect: function(dbname){
        //创建连接    
        var client = mysql.createConnection({    
          user: DB_USER_NAME,    
          password: DB_PASSWD,    
        });    

        client.connect();
        client.query("use " + (dbname ? dbname : DEFAULT_DB_NAME));
        return client;
    },
    query: function (sql, conn){
        var self = this;
        return  new Promise(function(res,rej){
            if(arguments.length < 1){
                reject("param error");
                return ;
            }
            var client =  conn;
            if(client == null){
                client = self.connect();
            }
            client.query(sql, function(err,results, fields) {
                client.end();    
                if(err){
                    console.log(err);
                    return rej(err);
                }
                if(results){
                    return res(results, fields);
                }
                console.log(err);
                return rej(err,results, fields);
            });
        
        });
        
    },
    escape: mysql.escape,
    format: mysql.format,
}