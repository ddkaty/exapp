var aa = require("./sys_mon") ;

aa.freeCommand(function(value){
    console.log( 'CPU Usage (%): ' + value );
})