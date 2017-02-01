
module.exports = {
    index: function *(next){
        yield this.render('home/index.jade');
    }

}

