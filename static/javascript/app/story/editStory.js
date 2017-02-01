require(['story/loadStoryList'],function(loadStoryList){
    var URLS = {
        postStory : {
            url: '/story/commit/postStory',
            method: 'POST',
            type:'json',
        }
    }
    loadStoryList();

    //main
    var vueMainData = {
        title:'',
        content:'',
        story_id: 0,
    };
    new Vue({
        el: "#main",
        data: vueMainData,
        methods:{
            submitwriteStoryForm: function(){
                console.log(arguments)
                console.log(vueMainData);

                var formData = {
                    title: vueMainData.title,
                    content: vueMainData.content,
                }
                var model = {};
                if(!isNaN(vueMainData.story_id) && vueMainData.story_id > 0){
                    model = URLS.editChapter;
                    formData.story_id = vueMainData.story_id;
                }
                $.ajax({
                    type: URLS.postStory.method,
                    dataType: URLS.postStory.type,
                    url:  URLS.postStory.url,
                    data: formData,
                    success: function (result) {
                        if(0 == result.errno){
                            alert("发布成功!");
                            location.href="/story/readStory?story_id=" + result.data.story_id;
                            loadStoryList();
                        }
                    },
                    error: function(data) {
                        console.log("ajax faild");
                    }
                });
                return false;
            },
            editStoryContentChange: function(){

                vueMainData.content_preview = markdown.toHTML(vueMainData.content);
                console.log(vueMainData.content_preview);
            }
        }
    });
});