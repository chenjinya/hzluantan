require([],function(){
    var URLS = {
        getChapterInfo : {
            url: '/story/chapter/getChapterInfo',
            method: 'GET',
            type:'json',
        },
        getNodeChaptersInfo : {
            url: '/story/chapter/getNodeChaptersInfo',
            method: 'GET',
            type:'json',
        },
        getStoryChapter: {
            url: '/story/chapter/getStoryChapter',
            method: 'GET',
            type:'json',
        }
    }
    function processBarCtrl(){
        var $mainContent = $(".main-content");
        var contentHeight = $mainContent.height();
        var contentWidth = $mainContent.width();
        var clientHeight = $(window).height();
        var $processBar = $(".main-processbar");
        $processBar.css({
            width: contentWidth,
        });
        var processBarLen = $processBar.find(".processbar-len");
        $(window).on("scroll", function(){
            var scrollTop = $(window).scrollTop();
            var process =Math.ceil((scrollTop + clientHeight) / $(".main-content").height() * 100);
            console.log(scrollTop,clientHeight, $(".main-content").height() ,process)
            if(process > 100){
                process = 100;
            }
            processBarLen.stop();
            processBarLen.animate({
                width: process + "%",
            },800);
            $processBar.find(".processbar-desc").css({
                marginLeft: process + "%",
            }).html(process+ "%");
        });
       
    }

    
    
    function getChapterInfo (chapterId){
        $.ajax({
            type: URLS.getChapterInfo.method,
            dataType: URLS.getChapterInfo.type,
            url:  URLS.getChapterInfo.url,
            data: { chapter_id: chapterId},
            success: function (result) {
                if(0 == result.errno ){
                    vueMainData.title = result.data.chapter_info.title;
                    vueMainData.chapter_id = result.data.chapter_info.chapter_id;
                    vueMainData.zan_count = result.data.chapter_info.zan_count;
                    vueMainData.story_id = result.data.chapter_info.story_id;
                    vueMainData.node_id = result.data.chapter_info.node_id;
                    vueMainData.content = markdown.toHTML(result.data.chapter_info.content);
                    vueMainData.nodes = result.data.chapter_info.nodes;
                    if(result.data.parent_node_id){
                        vueMainData.parent_node_id  = result.data.parent_node_id;
                    }
                    processBarCtrl();
                    
                }
            },
            error: function(data) {
                console.log("ajax faild");
            }
        });
    }

    var chapterId = parseInt($(".main-content").attr("data-chapter-id"));
    getChapterInfo(chapterId);

    function getNodeChaptersInfo (nodeId){
        $.ajax({
            type: URLS.getNodeChaptersInfo.method,
            dataType: URLS.getNodeChaptersInfo.type,
            url:  URLS.getNodeChaptersInfo.url,
            data: { node_id: nodeId},
            success: function (result) {
                if(0 == result.errno ){
                    vueSidebarData.sidebarListData = result.data;
                }
            },
            error: function(data) {
                console.log("ajax faild");
            }
        });
    }
    var nodeId = parseInt($(".main-content").attr("data-node-id"));
    getNodeChaptersInfo(nodeId);


    function readNodeChapter (storyId, nodeId){
        $.ajax({
            type: URLS.getNodeChaptersInfo.method,
            dataType: URLS.getNodeChaptersInfo.type,
            url:  URLS.getNodeChaptersInfo.url,
            data: { node_id: nodeId},
            success: function (result) {
                if(0 == result.errno ){
                    var data = result.data;
                    var chapterInfo = data[0];
                    if(chapterInfo && chapterInfo.chapter_id){
                        location.href="/story/readChapter?chapter_id=" + parseInt(chapterInfo.chapter_id) ;

                    } else {
                        var go = confirm("此分支还没有人创作，你愿意去创作吗？");
                        if(go){
                            location.href="/story/editChapter?story_id=" + parseInt(storyId) + "&node_id=" + parseInt(nodeId);
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

    //main
    var vueMainData = {
        content:"",
        title:"",
        zan_count: 0,
        chapter_id: 0,
        story_id: 0,
        node_id: 0,
        nodes:[],
        parent_node_id:null,
    };
    new Vue({
        el: "#main",
        data: vueMainData,
        methods:{
            writeStoryChapter: function(story_id){
                location.href="/story/editChapter?story_id=" + parseInt(story_id);
                return false;
            },
            rewriteBtnClick: function(storyId, chapterId, nodeId){
                location.href="/story/editChapter?story_id=" + parseInt(storyId) + "&node_id=" + parseInt(nodeId);
                return false;
            },
            nodeBtnClick: function(index,item){
                console.log(arguments);
                readNodeChapter(item.story_id, item.node_id);
                return false;
            },
            prevChapterBtnClick: function(storyId, nodeId){
                console.log(arguments);
                readNodeChapter(storyId, nodeId);
            }
        }
    });

    //main
    var vueSidebarData = {
        sidebarListData:[],
       
    };
    new Vue({
        el: "#sidebar",
        data: vueSidebarData,
        methods:{
            sidebarItemClick: function(index,item, currentId){
                if(currentId == item.story_id){
                    return false;
                }
                location.href="/story/readChapter?chapter_id=" + parseInt(item.chapter_id) ;
                console.log(index,item);
            }
        }
    });

});