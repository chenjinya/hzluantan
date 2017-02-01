var koa = require('koa');
var Router  = require('koa-router');
var koaBody   = require('koa-body');
var bodyParser = require('koa-bodyparser');
var xmlParser = require('koa-xml-body').default;
var views = require('koa-views');
var serve = require('koa-static');

var app = koa();
var router = new Router();

app.use(serve(__dirname + '/static'));

// Must be used before any router is used 
app.use(views(__dirname + '/view', {
  map: {
    jade: 'jade',
    html: 'html',
  }
}));

app.use(xmlParser());
//app.use(koaBody({formidable:{uploadDir: __dirname}}));
app.use(bodyParser());

app
.use(router.routes())
.use(router.allowedMethods());

// logger 
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('http node process time: %s %s - %s', this.method, this.url, ms);
});

require('./router/index.js')(router);
// console.log(process.env)
app.listen(18080);





