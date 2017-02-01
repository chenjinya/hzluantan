var Ocr = require('../controller/ocr.js');
var Wx = require('../controller/wx.js');
var Home = require('../controller/home.js');
var Story = require('../controller/story.js');
var Chapter = require('../controller/chapter.js');

var User = require('../controller/user.js');


module.exports = function(router){
  router
  .get('/wx', Wx.confirm)
  .post('/wx', Wx.post)
  .get('/ocr', Ocr.index)
  .post('/ocr', Ocr.scan)
  .get('/test', Wx.test)
 
  .get('/story', Story.index)
  .get('/story/write', Story.write)
  .get('/story/read', Story.read)
  .get('/story/editStory', Story.editStory)
  .get('/story/story/getStory', Story.getStory)
  .get('/story/readStory', Story.readStory)
  .get('/story/listStory', Story.listStory)
  .post('/story/commit/postStory', Story.postStory)

  .get('/story/editChapter', Chapter.editChapter)
  .get('/story/chapter/getChapterInfo', Chapter.getChapterInfo)
  .get('/story/chapter/getNodeChaptersInfo', Chapter.getNodeChaptersInfo)
  .get('/story/readChapter', Chapter.readChapter)
  .post('/story/commit/postChapter', Chapter.postChapter)


  .get('/user/profile', User.profile);
  //.get('/ocr-upload', Ocr.upload);

  router
  .get('/', Home.index);
  
  router
  .get('/*', function *(next) {
    //this.body = "Are U ok ?";
  });
}

