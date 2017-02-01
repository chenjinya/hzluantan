var crypto = require('crypto');
var request = require('request');
var ak = 'bce ak here';
var sk = 'bce sk here';
var ocr = require('baidu-ocr-api').create(ak,sk);


module.exports = {
    confirm : function *(next) {
        var nonce = this.query.nonce;
        var signature = this.query.signature;
        var timestamp = this.query.timestamp;
        var echostr = this.query.echostr;
        var token = 'wx token here';
        var list = [token, nonce, timestamp];
        list.sort();
        var strList = list.join('');
        console.log(list);
        var cry = ( crypto.createHash('sha1').update(strList).digest('hex') );
        
        console.log('echo:',echostr);
        console.log("Original str : " + cry);
        console.log("Signature : " + signature);
        if(signature == cry){
            this.body = echostr;
        } else {
            this.body = cry;
        }
    },
    post: function *(next){
        
        console.log(this.request.body);
        
        if(this.request.body['xml']){
            var xmlData = this.request.body['xml'];
            for(var k in xmlData){
                if(xmlData.hasOwnProperty(k)){
                    if(xmlData[k].length == 1){
                        xmlData[k] = xmlData[k][0];
                    }
                }
            }

            this.response.set('Content-Type', 'text/xml;charset=utf-8');
            var msgType = xmlData["MsgType"];
            console.log(xmlData);
            if('text' == msgType){
                var xml = '';
                yield replayMsg(xmlData).then(function(body){
                        console.log(body);
                        xml = body;
                });
                this.body = xml;

            } else if('image' == msgType){
                var content = "如果需要识别图中文字，请访问: http://hzluantan.duapp.com/ocr";
                xmlData['Content'] = content;
                this.body = replayMsgXML(xmlData);
            } else if('event' == msgType){
                if(xmlData['Event'] == "subscribe" )
                var content = "欢迎来到【挥指乱弹】公众号\n"
                + "1.回复[投稿] 可以投稿进行读书笔记、生活感悟等等可以分享的内容; \n"
                + "2.回复[识图]或者图片 可以将图片中的文字转为文本，或者直接访问  http://hzluantan.duapp.com/ocr 进行转换;\n"
                + "3.如果收到莫名其妙的回复，那一定是机器人\n"
                + "还有人工智能、VR、AR、大脑连接、控制世界等等更多功能目前暂未开放";
                xmlData['Content'] = content;
                this.body = replayMsgXML(xmlData);
            }
             else {
                this.body = 'success';
            }
            
        } 
        else {
            this.body = 'success';
        }
        if(!this.body){
            this.body="success";
        }

        console.log(this.response);

    }, 
    test: function * (next){
        var content = this.query.content;
        var str = '';
        var xmlData = {
            "Content": content,
        };
        var str = ''
        yield replayMsg(xmlData).then(function(body){
                console.log(body);
                str =  body;
        });


        this.body = str;
        // var res =  request('http://www.xiaodoubi.com/simsimiapi.php?msg=' + encodeURIComponent(content));
        // this.body =  res;
        // var replaymsg = replayMsg(xmlData);
        // //api
        // var res = replaymsg.next();
        // console.log(res);
        // res = replaymsg.next();
        // console.log('134',res);
        // console.log(xmlData);
        //xmlData["Content"] = res.value;
        //this.body =replayMsgHtml(xmlData);
        
        // var g = replayMsg(xmlData);
        //next();
        // this.body =g .next();
       
    }

}
var simsimiapi  = function(content){
    return new Promise(function(resolve,reject ) {
        request('http://www.xiaodoubi.com/simsimiapi.php?msg=' + encodeURIComponent(content),function(err,response,body){
                resolve(body);
           });
    });
}
var replayMsg = function ( param){
    return new Promise(function (resolve,reject ) {
        if(param['Content']){
            if(param['Content'].indexOf("[投稿]") ==0 || param['Content'].indexOf("投稿") ==0) {
                param['Content'] = "欢迎投稿,直接回复: 选段 《书名》章节名 ，一经采用，会在公众账号里发表";
                resolve(replayMsgXML(param));
            } else if(param['Content'].indexOf("[识图]") ==0 || param['Content'].indexOf("识图") ==0) {
                param['Content'] = "如果需要识别图中文字，请访问: http://hzluantan.duapp.com/ocr";
                resolve(replayMsgXML(param));
            } else {
               var str = '';
               var res = simsimiapi(param['Content']).then(function(body){
                    param['Content'] = body;
                    resolve(replayMsgXML(param));
               });
            }
        } else {
            resolve(replayMsgXML(param));
        }
    });
};
var replayMsgXML = function(param){
    var html = '<xml>'
    +'<ToUserName><![CDATA['+ param['FromUserName'] +']]></ToUserName>'
    +'<FromUserName><![CDATA['+ param['ToUserName'] +']]></FromUserName>'
    +'<CreateTime>['+ Math.ceil(Date.now() / 1000) +']</CreateTime>'
    +'<MsgType><![CDATA[text]]></MsgType>'
    +'<Content><![CDATA['+ param['Content'] +']]></Content>'
    +'</xml>';
    return html;
}

