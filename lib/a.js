var child_process = require('child_process');  


var imgcompress = function(url){
    child_process.exec( "gulp testImagemin --gulpfile lib/gulpfile.js --url " + url, { 
        detached: true, 
        stdio: 'ignore'} , function(error, stdout , stderr ) {
        if (error) {
            console.log(error)
        }
        else {
            console.log( stdout );        
        }
    });
}

module.exports = imgcompress

