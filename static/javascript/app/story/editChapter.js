// define('main',function(){
//   alert(1);
//   return 123;
// });
require([],function(p){
    console.log(arguments);
    var URLS = {
        postChapter : {
            url: '/story/commit/postChapter',
            method: 'POST',
            type:'json',
        }
    }
    var newNode = {
                content:'',
            };
    var vueData = {
        story_id: 0,
        node_id: 0,
        title:'',
        content:'',
        content_preview:'',
        nodes:[
            _.clone(newNode),
            _.clone(newNode)
        ],
    };
    var v = new Vue({
        el: "#vue-app-editChapter",
        data: vueData,
        methods:{
            submitEditChapterForm: function(){
                console.log(arguments)
                console.log(vueData);

                var formData = {
                    title: vueData.title,
                    content: vueData.content,
                    story_id: vueData.story_id,
                    node_id: vueData.node_id,
                }
   
                formData['nodes'] = _.map(vueData.nodes, function(item){ 
                    return { 
                        content: item.content,
                        node_id: item.node_id,
                    } 
                });

                $.ajax({
                    type: URLS.postChapter.method,
                    dataType: URLS.postChapter.type,
                    url:  URLS.postChapter.url,
                    data: formData,
                    success: function (result) {
                        if(0 == result.errno){
                            alert("发布成功!");
                            location.href="/story/readChapter?chapter_id=" + result.data.chapter_id;
                        }
                    },
                    error: function(data) {
                        console.log("ajax faild");
                    }
                });
                return false;
            },
            editChapterContentChange: function(){
                vueData.content_preview = markdown.toHTML(vueData.content);
            },
            addNode: function(){
                vueData.nodes.push(_.clone(newNode));
                return false;
            },
            remNode: function(index){
                vueData.nodes.splice(index, 1);
            }
        }
    });
});