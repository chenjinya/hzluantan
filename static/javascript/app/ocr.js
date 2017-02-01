(function(w){
	var $window = $(w);
	
	var $ocrFileInput = $(".ocr-file-input");
    var $ocrUploadButton = $(".ocr-upload-button");
    var $ocrUploadProgress = $(".ocr-upload-progress");
    var $ocrResult = $(".ocr-result");
    var $ocrAlert = $(".ocr-alert");
    var $ocrImagePreview = $(".ocr-image-preview");

    var fileToUpload;
    var BOS_HOST = 'http://upload-img.bj.bcebos.com';
    var BOS_BUCKET = 'upload-img';
    var uploader = new baidubce.bos.Uploader({
      browse_button: '.ocr-file-input',
      bos_bucket: BOS_BUCKET,
      bos_endpoint: BOS_HOST,
      bos_ak: '07130a3992af47ddbbb1013a8da1a934', 
      bos_sk: '1913107a7c0a456ab3b901816400b132',
      max_file_size: '5mb',
      init: {
        FileUploaded: function (_, file, info) {
          var bucket = info.body.bucket;
          var object = info.body.object;
          var url = BOS_HOST + '/' + bucket + '/' + object;
          $ocrUploadButton.html("分析数据中..");
          $ocrAlert.html("分析数据中..");
          $ocrUploadProgress.find(".ocr-upload-progress-bar").animate({
              "width": "70%"
            },5000,"linear");

          $.ajax({
             type: "POST",
             url: "/ocr",
             data: { url :url},
             dataType: "json",
             success: function(json){
                if(json && json.results && json.results.words){
                    $ocrUploadProgress.hide();
                    $ocrAlert.html("分析完成");
                    $ocrResult.show().find(".panel-body").html(json.results.words);
              } else {
                  $ocrAlert.html("这图对我来说。。真是太难了");
              }
              $ocrUploadButton.html("选择图片").attr("disabled", null);
              $ocrUploadProgress.hide();
            },
            error: function(){
              $ocrUploadProgress.hide();
              $ocrResult.hide();
              $ocrAlert.html("这图对我来说。。真是太难了");
              $ocrUploadButton.html("选择图片").attr("disabled", null);
            }
          });
          
        },
        UploadComplete: function() {
          //$ocrUploadProgress.find(".ocr-upload-progress-bar").stop().css("width","100%");
          // $ocrUploadProgress.hide();

        }
      }
    });
    $("body").on("click", ".ocr-upload-button", function(){
        //if($ocrFileInput[0].files.length == 0){
          $ocrFileInput.trigger("click");
        //
    })
    .on("change", ".ocr-file-input", function(){
        console.log("change");
        if($ocrFileInput[0].files.length == 0){
            $ocrUploadButton.html("选择图片");
        } else {
            $ocrUploadProgress.find(".ocr-upload-progress-bar").css({
              "width": "0%"
            });
            $ocrUploadProgress.hide();
            $ocrResult.hide();
             var reader = new FileReader();
             reader.onload=function(){
              $ocrImagePreview.show();
                    $ocrImagePreview.attr("src",this.result);
             }
             var file = $ocrFileInput[0].files[0];
            reader.readAsDataURL(file);
            $ocrUploadButton.html("上传中...");
            $ocrUploadButton.attr("disabled","disabled");
            $ocrUploadProgress.show();
            $ocrUploadProgress.find(".ocr-upload-progress-bar").animate({
              "width": "70%"
            },5000,"linear");
            uploader.start();
            return false;
        }
        
    });



	//document.execCommand('formatBlock', false, '<' + $(this).data('role') + '>');
})(window);
