var db = require('../util/DB.js');  
var Node = require('../model/node');
var co = require('co'); 

module.exports =  {

    insert: function(param) {
        return new Promise(function(resolve, reject){
            console.log(param);
            co(function *  (){
                var sqlValue = {
                    chapter_id: param.chapter_id,
                    title: param.title,
                    content: param.content,
                    story_id: param.story_id,
                    author_id: param.author_id,
                    node_id: param.node_id,
                    status: param.status ? param.status: 0,
                    create_time: (new Date()).toLocaleString(),
                    update_time: (new Date()).toLocaleString(),
                };
                var sql =  db.format('insert into chapter set ?', sqlValue);
                  
                console.log(sql);
                yield db.query(sql).then(function(res){
                    console.log(res);
                }).catch(function(err){
                    console.log(err);
                    reject(err);
                    return false;
                });
                //insert nodes

                var nodeRet = null;
                yield Node.insert(param).then(function(res){
                    resolve(res);
                }).catch(function(err){
                    console.log(err);
                    reject(err);
                    return false;
                });
                
                
            });
        })
    },
    getChapterById: function(param) {
        return new Promise(function(resolve, reject){
            co(function *  (){
                var chapterObj = {};
                console.log(param);
                var sql = '';
                if(param.chapter_id){
                    sql = db.format('select * from chapter where chapter_id = ?', param.chapter_id);

                }else if(param.node_id){
                    sql = db.format('select * from chapter where node_id = ?', param.node_id);

                } else {
                    throw "Param error";
                }
                console.log(sql);
                yield db.query(sql).then(function(res){
                    chapterObj = res[0];
                    
                }).catch(function(err){
                    console.log(err);
                    reject(err);

                });
                console.log(chapterObj)
                var input= {
                    node_id: chapterObj.node_id,
                }
                var nodeList = null;
                yield Node.getChildrenNodesInfoById(input).then(function(res){
                    for(var i in res){
                        var item = res[i];
                        if(res.hasOwnProperty(i) && item['parent_id'] != item['node_id']){
                            if(!nodeList){
                                nodeList = {};
                            }
                            nodeList[item.node_id] = item;
                        }
                    }
                }).catch(function(err){
                    console.error(err);
                    reject(err);
                });

                chapterObj['nodes'] = nodeList;
                resolve(chapterObj);
                

            });
        })
    },
    getStoryNodeChapter: function(param){
        return new Promise(function(resolve, reject){
            co(function *  (){
                console.log(param);
                var sql = db.format('select * from chapter where story_id=? and node_id =? ', [param.story_id, param.node_id]);
                console.log(sql);
                yield db.query(sql).then(function(res){
                    resolve(res);
                    
                }).catch(function(err){
                    console.log(err);
                    reject(err);

                });

            });
        });
    },
    getChaptersByNodeId: function(param){
        return new Promise(function(resolve, reject){
            co(function *  (){
                var chaptersObj = {};
                console.log(param);
                var sql = db.format('select * from chapter where node_id in (?) ', param.node_ids);
                console.log(sql);
                yield db.query(sql).then(function(res){
            
                    resolve(res);
                    
                }).catch(function(err){
                    console.log(err);
                    reject(err);

                });

            });
        });
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
                    chapter_id: param.chapter_id
                }

                console.log(sqlValue,whereValue);
                var sql = db.format('update story set ? where ? ' ,  [sqlValue, whereValue]);
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
    
}
