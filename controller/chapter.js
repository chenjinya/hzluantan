var Story = require('../model/story');
var Chapter = require('../model/chapter');
var Node = require('../model/node');
var Idalloc = require('../model/idalloc');

module.exports = {
    index: function *(next){
        yield this.render('story/index.jade');
    },
    read: function *(next){
        yield this.render('story/read.jade');
    },
    getChapterInfo: function *(){
        var retData = {
            errno: 0
        };
        var input = {
            chapter_id: chapterId 
        }
        var chapterId = parseInt(this.query.chapter_id);
        var nodeId = parseInt(this.query.node_id);
        if(!isNaN(chapterId) && chapterId != 0 ){
            input = {
                chapter_id: chapterId 
            }
        } else if(!isNaN(nodeId) && nodeId != 0 ){
            input = {
                node_id: nodeId 
            }
        } 
        
        //console.log(input)
        var promise = Chapter.getChapterById(input);
        var chapterInfo = {};
        yield promise.then(function(res){
            // console.log(res);
            chapterInfo = res;
        }).catch(function(err){

        });


        var nodeId = chapterInfo.node_id;
        var prevChapterInfo = null;;
        input = {
            node_id: nodeId ,
        }
        var promise = Node.getNodeInfoById(input);
        var nodeInfo = {};
        yield promise.then(function(res){
            //console.log(res);
            nodeInfo = res;
        }).catch(function(err){

        });
        
        var prevNodeId = nodeInfo['parent_id'];
        //console.log("prev ", prevNodeId)
        if(nodeInfo["parent_id"] == nodeInfo["node_id"]){
            prevNodeId = null;;
        } 
 
        // console.log(chapterInfo);
        var assignData = {
            chapter_info: chapterInfo,
            parent_node_id: prevNodeId
        };
        retData.data = assignData;
        this.body = retData;
    },
    getNodeChaptersInfo: function *(){
        var retData = {
            errno: 0
        };
        var nodeId = parseInt(this.query.node_id);
        if(isNaN(nodeId) ){
            retData.errno = 1;
            this.body = retData;
            return;
        }

        var input = {
            node_ids:[nodeId]
        }
        var promise = Chapter.getChaptersByNodeId(input);
        var chapterList = {};
        yield promise.then(function(res){
            // console.log(res);
            chapterList = res;
        }).catch(function(err){
            retData.errno = 9;
            this.body = retData;
            return;
        });
        // console.log(modelRes);
         var assignData = [];
        for(var i in chapterList) {
            var item = chapterList[i];
            assignData.push({
                title: item.title,
                chapter_id: item.chapter_id,
                story_id: item.story_id,
                node_id: item.node_id,
            });
        }   
        //console.log(assignData);
        retData.data = assignData;
        this.body = retData;
    },
    readChapter: function *(next){
        var chapterId = parseInt(this.query.chapter_id);
        if(isNaN(chapterId) ){
            throw 'param error';
        }
        if(isNaN(chapterId)){
            nodeId = 0;
        }
        var input = {
            chapter_id :chapterId
        }
        var promise = Chapter.getChapterById(input);
        var chapterInfo = {};
        yield promise.then(function(res){
           // console.log(res);
            chapterInfo = res;
        }).catch(function(err){

        });

        if(undefined == chapterInfo){
            return false;
        }
        //console.log(111111,chapterInfo);
        var assignData = {
            title: chapterInfo.title,
            content: chapterInfo.content,
            chapter_id: chapterId,
            node_id: chapterInfo.node_id,
            story_id: chapterInfo.story_id,
            nodes: chapterInfo.nodes,
        };
        yield this.render('story/readChapter.jade', assignData);
    },
    editChapter: function *(){
        var storyId = parseInt(this.query.story_id);
        var nodeId = parseInt(this.query.node_id);
        if(isNaN(storyId) || isNaN(nodeId)){
            throw 'param error';
        }

        var input = {
            story_ids:[storyId]
        }
        var promise = Story.getStorysByIds(input);
        var storyInfo = {};
        yield promise.then(function(res){
            storyInfo = res[storyId];
        }).catch(function(err){
            
        });
        input = {
            node_id: nodeId,
        }
        //console.log(input)
        var promise = Node.getNodeInfoById(input);
        var nodeInfo = {};
        yield promise.then(function(res){
            nodeInfo = res;
        }).catch(function(err){
            
        });

        var assignData = {
            story_info: storyInfo,
            node_info: nodeInfo,
            story_id: storyId,
            node_id: nodeId,
        };
        //console.log(assignData)
        yield this.render('story/editChapter.jade',assignData);
    },
    postChapter: function *(){
        var postData = {};
        console.log(this.request.body);
        postData.title = this.request.body.title;
        postData.content = this.request.body.content;
        postData.nodes = this.request.body.nodes;
        postData.story_id = parseInt(this.request.body.story_id);
        postData.node_id = parseInt(this.request.body.node_id);
        postData.author_id = 1;
        var retData = {
            errno: 0
        };
        var chapterId = this.request.body.chapter_id;
        if(isNaN(postData.author_id)
            || isNaN(postData.story_id)
            || postData.content == ''
            || postData.title == ''
            ){
            retData.errno = 9;
            return this.body= retData;
        }
        if(isNaN(chapterId)){
            yield Idalloc.getId("idalloc_chapter").then(function(result){
                chapterId = result;;
                console.log(result);
            }).catch(function(err){
                retData.errno = 9;
            });
            if(retData.errno == 9){
                return this.body = retData;
            }
            console.log("chapterId id:", chapterId);
            postData.chapter_id = chapterId;

            for(var i in postData.nodes){
                var nodeId = 0;
                yield Idalloc.getId("idalloc_node").then(function(result){
                    nodeId = result;;
                    console.log(result);
                }).catch(function(err){
                    retData.errno = 9;
                });
                postData.nodes[i].node_id = nodeId;
            }

            retData.data = postData;
            yield Chapter.insert(postData).then(function(res){
                console.log(res);
            }).catch(function(err){
                retData.errno = 9;
            });
        }  else {

            postData.story_id = storyId;
            retData.data = postData;
            var promise = Chapter.update(postData);
            yield promise.then(function(res){
                console.log(res);
            }).catch(function(err){
                retData.errno = 9;
            });
        }
        
        this.body = retData;
    }

}

