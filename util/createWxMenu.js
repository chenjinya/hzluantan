var request = require('request');
//https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET

var appid='wx20bf0f18d91a5dad';
var secret = '2d4df7b2484005f2e86feef87afb14fd';
var menu = {
         
             "button":[
                 {  
                      "type":"click",
                      "name":"乱",
                      "key":"MENU_ITEM_1"
                  },
                  {
                       "name":"挥指",
                       "sub_button":[
                           {    
                               "type":"view",
                               "name":"OCR识图",
                               "url":"http://hzluantan.duapp.com/ocr"
                            }
                        ]
                   },
                   {  
                      "type":"click",
                      "name":"弹",
                      "key":"MENU_ITEM_2"
                  }
            ]
         
    };
// request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appid+'&secret='+secret,function(err,response,body){
                
    
//     console.log(body);
//     
// });

var access_token = 'LStvlllJWLFDWj1Yurllg_9lbbhd6rvGIBuBU5QHOHMI_k9D2Riaa_YQK4xoe1bdRfWIw9ArAOyDV09-qpPgiJ3-csPf_u7fLo_F8f_7B0BFc45CJez6a8f1LE20z3ahSYPhAHAMSJ';

request.post('https://api.weixin.qq.com/cgi-bin/menu/create?access_token=' + access_token,menu, function(err,response,body){
        console.log(body);
   });

// request.post('https://api.weixin.qq.com/cgi-bin/menu/create?msg=' + encodeURIComponent(content),function(err,response,body){
//                 resolve(body);
//            });