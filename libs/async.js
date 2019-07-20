
var Async = function () {
    var self = this;
    this.map = function (array,func,callback) {
        //array => images
        //func => downloadImage
        //callback => function anonyme
        var count = array.length;
        var errors = [];
        var results = [];
        for(var i=0; i<array.length;i++){
            (function (i) {
                func(array[i],function (err,result) {
                    count--;
                    if(error)//stock error
                        errors[i]=error;
                    else
                        results[i]=result;
                    if(count<1)
                        return callback((errors.lenght>0)?errors:null,results);
                });
            })(i);
        }
    };
    this.waterfall = function () {
        //precedente fonction sans résultat :
        //[0] jobs
        //[1] callback

        //precedente fonction avec résultat :
        //[0] jobs
        //[1] resultat  //de la précédente fonction
        //[2] callback

        var jobs = arguments[0];
        var callback = (arguments.length > 2)? arguments[2]:arguments[1];

        var job = jobs.shift();

        var after = function (error, result) {
            if(error)
                return callback(error);
            if(jobs.length<1)
                return callback(null,result);

            var args = [];
            args.push(jobs);
            if(result != undefined)
                args.push(result);
            args.push(function (error,result) {
                if(error)
                    return callback(error);
                else
                    return callback(null,result);
            });

            self.waterfall.apply(this,args);
        };

        //sans précédent résultat
        //[0] result    //de la fonction précédente
        //[1] callback
        var args = [];
        if(arguments.length>2)
            args.push(arguments[1]);
        args.push(after);

        job.apply(this,args);
    };

};

module.exports = new Async();
