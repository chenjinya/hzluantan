require(['story/loadStoryList'],function(loadStoryList){
    var URLS = {
        getNodeChaptersInfo : {
            url: '/story/chapter/getNodeChaptersInfo',
            method: 'GET',
            type:'json',
        },
        getStory: {
            url: '/story/story/getStory',
            method: 'GET',
            type:'json',
        }
    }
    loadStoryList();
    function getStoryInfo (storyId){
        $.ajax({
            type: URLS.getStory.method,
            dataType: URLS.getStory.type,
            url:  URLS.getStory.url,
            data: { story_id: storyId},
            success: function (result) {
                if(0 == result.errno ){
                    vueMainData.title = result.data.title;
                    vueMainData.content = markdown.toHTML(result.data.content);
                }
            },
            error: function(data) {
                console.log("ajax faild");
            }
        });
    }

    var storyId = parseInt($(".main-content").attr("data-story-id"));
    getStoryInfo(storyId);

    //main
    var vueMainData = {
        title: '',
        content: '',
    };
    new Vue({
        el: "#main",
        data: vueMainData,
        methods:{
            writeStoryChapter: function(storyId,nodeId){
                location.href="/story/editChapter?story_id=" + parseInt(storyId) + "&node_id=" + parseInt(nodeId);
                return false;
            },
            getNodeChaptersInfo: function(storyId,nodeId){
                getNodeChaptersInfo(storyId, nodeId);
            }
        }
    });
    function getNodeChaptersInfo (storyId, nodeId){
        console.log(arguments);
        $.ajax({
            type: URLS.getNodeChaptersInfo.method,
            dataType: URLS.getNodeChaptersInfo.type,
            url:  URLS.getNodeChaptersInfo.url,
            data: {  node_id: nodeId},
            success: function (result) {
                if(0 == result.errno ){
                    var data = result.data[0];

                    if(data && data.chapter_id){
                        location.href="/story/readChapter?chapter_id=" + parseInt(data.chapter_id) ;

                    } else {
                        var go = confirm("此故事还没有人创作，你愿意去创作吗？");
                        if(go){
                            location.href="/story/editChapter?story_id=" + parseInt(storyId) + "&node_id=" + parseInt(nodeId) ;
                        }
                    }
                    return false;
                }
            },
            error: function(data) {
                console.log("ajax faild");
            }
        });
    }
});