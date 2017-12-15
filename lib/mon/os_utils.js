var aa = require("./sys_mon") ;

console.log(aa.freeCommand(function(value){
    console.log( 'CPU Usage (%): ' + value );
}))