var ak = '5IgE4rei1A1gxVwBujmwcVtn';
var sk = 'fGgqDvrGIfRlsu4AsbbQWlz1GtLY8VCe';
var ocr = require('baidu-ocr-api').create(ak,sk);

exports.ocr = function(url){
	// 外部图片
	var scan = ocr.scan({
	  url:url, // 支持本地路径
	  type:'text',
	});
	var res = scan.then(function(res){
		console.log(res);
		return 222;
	})
	console.log(res);
	return res;
}