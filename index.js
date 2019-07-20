
var async = require("./libs/async.js");
var request = require("./libs/request.js");

var config = require("./config.json");

async.map(config.images,request,function (err,results) {
    if(err)
        console.error(err);
    var totalSize = 0;
    for(var i=0; i<results.length;i++){
        totalSize += results[i].length;
    }
    console.log("All Download ended, results : ",totalSize);
});