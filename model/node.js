var db = require('../util/DB.js');    
var co = require('co'); 

module.exports =  {

    insert: function(param) {
        return new Promise(function(resolve, reject){
            co(function *  (){
                valueStr = "";
                for( var i in param.nodes){
                    var item = param.nodes[i];

                    var arr = [
                        item.node_id,
                        item.content,
                        param.node_id,
                        param.story_id,
                        param.author_id,
                        item.status ? item.status: 0,
                        (new Date()).toLocaleString(),
                        (new Date()).toLocaleString()
                    ];

                    var itemValueStr = arr.map(function(sqlv){ return db.escape(sqlv ); }).join(",");
                    
                    valueStr += "(" + itemValueStr + "),";
                };
                valueStr = valueStr.substr(0, valueStr.length -1 );

                
                var sql = 'insert into node(node_id,content,parent_id,story_id,author_id,status,create_time,update_time) '
                    +'values'+ valueStr;                  
                console.log(sql);
                yield db.query(sql).then(function(res){
                    resolve(res);
                }).catch(function(err){
                    console.log(err);
                    reject(err);
                });
            });
        })
    },
    getNodeInfoById: function(param) {
        return new Promise(function(resolve, reject){
            co(function *  (){
                console.log(param);
                var sql = db.format('select * from node where node_id =?', param.node_id);
                console.log(sql);
                yield db.query(sql).then(function(res){
                    resolve(res[0]);
                }).catch(function(err){
                    console.log(err);
                    reject(err);

                });
            });
        })
    },
    getChildrenNodesInfoById: function(param) {
        return new Promise(function(resolve, reject){
            co(function *  (){
                console.log(param);
                var sql = db.format('select * from node where parent_id =?', param.node_id);
                console.log(sql);
                yield db.query(sql).then(function(res){
                    resolve(res);
                }).catch(function(err){
                    console.log(err);
                    reject(err);

                });
            });
        })
    }
    
}
