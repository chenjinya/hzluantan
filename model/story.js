var db = require('../util/DB.js');    
var co = require('co'); 

module.exports =  {

    insert: function(param) {
        return new Promise(function(resolve, reject){
            console.log(param);
            co(function *  (){
                var sqlValue = {
                    title: param.title,
                    content: param.content,
                    node_id: param.node_id,
                    story_id: param.story_id,
                    author_id: param.author_id,
                    status: param.status ? param.status: 0,
                    create_time: (new Date()).toLocaleString(),
                    update_time: (new Date()).toLocaleString(),
                };
                var sql =  db.format('insert into story set ?', sqlValue);
                  
                console.log(sql);
                yield db.query(sql).then(function(res){
                    resolve(res);
                }).catch(function(err){
                    reject(err);
                });
            });
        })
    },
    listTitles: function(param) {
        return new Promise(function(resolve, reject){
            co(function *  (){
                var sql = 'select story_id,title from story where status = 0 limit '+ parseInt(param.offset)+','+ parseInt(param.limit)+' ';
                console.log(sql);
                yield db.query(sql).then(function(res){
                    resolve(res);
                }).catch(function(err){
                    reject(err);
                });
            });
        })
    },
    getStorysByIds: function(param) {
        return new Promise(function(resolve, reject){
            co(function *  (){
                var sql = 'select * from story where story_id in('+ param.story_ids.join(",")+') ';
                console.log(sql);
                yield db.query(sql).then(function(res){
                    var kvRes = {};
                    for(var i in res){
                        if(res.hasOwnProperty(i)){
                            var item = res[i];
                            kvRes[item.story_id] = item;
                        }
                    }
                    resolve(kvRes);
                }).catch(function(err){
                    reject(err);
                });
            });
        })
    },
    update: function(param) {
        return new Promise(function(resolve, reject){
            co(function *  (){
                
                var sqlValue = {
                    title: param.title,
                    content: param.content,
                    update_time: (new Date() ).toLocaleString(),
                };
                var whereValue = {
                    story_id: param.story_id
                }

                console.log(sqlValue,whereValue);
                var sql = db.format('update story set ? where ? ' ,  [sqlValue, whereValue]);
                console.log(sql);
                yield db.query(sql).then(function(res){
                    resolve(res);
                }).catch(function(err){
                    reject(err);
                });
            });
        })
    },
    
}
