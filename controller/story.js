var Story = require('../model/story');
var Node = require('../model/node');

var Idalloc = require('../model/idalloc');

module.exports = {
    index: function *(next){
        yield this.render('story/read.jade');
    },
    read: function *(next){
        yield this.render('story/read.jade');
    },
    write: function *(next){
        yield this.render('story/write.jade');
    },
    getStory: function *(){
        var retData  = {
            errno: 0,
        };
        var storyId = this.query.story_id;
        var input = {
            story_ids:[storyId]
        }
        var promise = Story.getStorysByIds(input);
        var modelRes = {};
        yield promise.then(function(res){
            modelRes = res[storyId];
        }).catch(function(err){

        });

        assignData = modelRes;
        retData.data = assignData;
        this.body = retData;
    },
    editStory: function *(){

        var storyId = parseInt(this.query.id);
        var assignData = {
            title:'',
            content:'',
        }
        if( isNaN(storyId) ) {
            yield this.render('story/editStory.jade', assignData);
            return;
        }
        var input = {
            story_ids:[storyId]
        }
        var promise = Story.getStorysByIds(input);
        var modelRes = {};
        yield promise.then(function(res){
            modelRes = res[storyId];
        }).catch(function(err){

        });

        assignData = modelRes;
        console.log(modelRes);
        yield this.render('story/editStory.jade',assignData);
    },
    readStory: function *(){
        var storyId = this.query.story_id;
        var input = {
            story_ids:[storyId]
        }
        var promise = Story.getStorysByIds(input);
        var modelRes = {};
        yield promise.then(function(res){
            modelRes = res[storyId];
        }).catch(function(err){

        });

        assignData = modelRes;
        console.log(assignData);
        yield this.render('story/readStory.jade', assignData);
    },
    listStory: function *(){

        var retData  = {
            errno: 0,
        };
        var input = {
            offset: 0,
            limit: 20,
        }
        var promise = Story.listTitles(input);

        yield promise.then(function(res){
            modelRes = res;
        }).catch(function(err){
            retData.errno = 9;
        });
        if(retData.errno == 9){
            return this.body = retData;
        }
        
        retData.data = modelRes;
        console.log(retData);
        this.body = retData
    },

    //post
    postStory: function *(){
        var postData        = {};
        postData.title      = this.request.body.title;
        postData.content    = this.request.body.content;
        postData.story_id   = parseInt(this.request.body.story_id);
        var retData  = {
            errno: 0,
        };
        console.log(postData);
        postData.author_id = 1;
        var storyId = postData.story_id;
        if(isNaN(storyId)){
            yield Idalloc.getId("idalloc_story").then(function(result){
                storyId = result;;
                console.log(storyId);
            }).catch(function(err){
                retData.errno = 9;
            });
            if(retData.errno == 9){
                return this.body = retData;
            }
            console.log("story id:", storyId);
            postData.story_id = storyId;

            var nodeId = 0;
            yield Idalloc.getId("idalloc_node").then(function(result){
                nodeId = result;;
            }).catch(function(err){
                retData.errno = 9;
            });
            if(!nodeId) {
                this.body = retData;
                return false;
            }

            console.log("root node id:", nodeId);
            postData.node_id = nodeId;

            postData.nodes = [
                {
                    node_id: nodeId,
                    content: '',
                }
            ]
            var nodeRet = null;
            yield Node.insert(postData).then(function(res){
                nodeRet = res;
            }).catch(function(err){
                retData.errno = 9;
            });
            console.log('noderet',nodeRet);
            if(!nodeRet) {
                this.body = retData;
                return false;
            }

            
            retData.data = postData;
            yield Story.insert(postData).then(function(res){
                console.log(res);
            }).catch(function(err){
                retData.errno = 9;
            });
        }  else {

            postData.story_id = storyId;
            retData.data = postData;
            var promise = Story.update(postData);
            yield promise.then(function(res){
                console.log(res);
            }).catch(function(err){
                retData.errno = 9;
            });
        }
        

        
        return this.body = retData;
        

    }

}

