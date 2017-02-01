define([],function(){
    var URLS = {
        listStory : {
            url: '/story/listStory',
            method: 'GET',
            type:'json',
        }
    }

    function loadSidebarData(){
        $.ajax({
            type: URLS.listStory.method,
            dataType: URLS.listStory.type,
            url:  URLS.listStory.url,
            data: { limit: 20, offset: 0},
            success: function (result) {
                if(0 == result.errno ){
                    vueSidebarData.listbarList = result.data;
                    console.log(vueSidebarData);
                }
            },
            error: function(data) {
                console.log("ajax faild");
            }
        });
    }
    var vueSidebarData = {
        listbarList:[],
    };
    new Vue({
        el: "#sidebar",
        data: vueSidebarData,
        methods:{
            sidebarItemClick: function(index,item, currentId){
                if(currentId == item.story_id){
                    return false;
                }
                location.href="/story/readStory?story_id=" + parseInt(item.story_id);
                console.log(index,item);
            }
        }
    });
    return loadSidebarData;
});