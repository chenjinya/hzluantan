var ak = '5IgE4rei1A1gxVwBujmwcVtn';
var sk = 'fGgqDvrGIfRlsu4AsbbQWlz1GtLY8VCe';
var ocr = require('baidu-ocr-api').create(ak,sk);

module.exports = {
    scan: function *(next){
      var url = this.request.body.url;
      var scan = ocr.scan({
        url: url, // 支持本地路径
        type:'text',
      });

      var ocrRes = {};
      yield scan.then(function(res){
        console.log(res);
        ocrRes = res;
      })
      console.log(ocrRes);
      this.body = ocrRes;
    },
    index: function *(){
        yield this.render('home/ocr.jade');
    }
}

