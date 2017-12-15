var aa = require("./sys_mon") ;

aa.freeCommand(function(value){
    console.log( 'CPU Usage (%): ' + value );
})

aa.cpuUtils(function(value){
    console.log( 'CPU Usage (%): ' + value );
})

aa.memUtils(function(value){
    console.log( 'CPU Usage (%): ' + value );
})

aa.networkUtils(function(value){
    console.log( 'CPU Usage (%): ' + value );
})

