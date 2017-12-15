var os = require("./sys_mon") ;

console.log(os.freeCommand(function(value){
    console.log( 'CPU Usage (%): ' + value );
}))