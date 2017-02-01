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
                text:'',
            };
    var vueData = {
        title:'',
        content:'',
        nodes:[
            _.clone(newNode)
        ],
    };
    var v = new Vue({
        el: "#vue-app-writepad",
        data: vueData,
        methods:{
            submitWritepadForm: function(){
                console.log(arguments)
                console.log(vueData);

                var formData = {
                    title: vueData.title,
                    content: vueData.content,
                }
   
                formData['nodes'] = _.map(vueData.nodes, function(item){ return { text: item.text } });

                $.ajax({
                    type: URLS.postChapter.method,
                    dataType: URLS.postChapter.type,
                    url:  URLS.postChapter.url,
                    data: formData,
                    success: function (result) {
                        console.log(result);
                    },
                    error: function(data) {
                        console.log("ajax faild");
                    }
                });
                return false;
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