var _os = require('os');

exports.platform = function(){ 
    return process.platform;
}

exports.cpuCount = function(){ 
    return _os.cpus().length;
}

exports.sysUptime = function(){ 
    //seconds
    return _os.uptime();
}

exports.processUptime = function(){ 
    //seconds
    return process.uptime();
}

// CPU
exports.cpuUtils = function(callback){
    require('child_process').exec('vmstat', function(error, stdout, stderr) {
        
        var lines = stdout.split("\n");
        var str_cpu_info = lines[2].replace(/^\s+|\s+$/g,'').replace( /[\s\n\r]+/g,' ');
        
        var cpu_info = str_cpu_info.split(' ') ;
       
        var cpuutils = []
        cpuutils[0] = parseFloat(cpu_info[0])   // 运行队列中进程数量
        cpuutils[1] = parseFloat(cpu_info[1])   // 等待IO的进程数量
        cpuutils[2] = parseFloat(cpu_info[10])  // interrupt
        cpuutils[3] = parseFloat(cpu_info[11])  // content switch 
        cpuutils[4] = parseFloat(cpu_info[12])  // User time
        cpuutils[5] = parseFloat(cpu_info[13])  // Sys time
        cpuutils[6] = parseFloat(cpu_info[14])  // Idle time
        cpuutils[7] = parseFloat(cpu_info[15])  // Wait time
         
        callback(cpuutils);
     });
}

// Memory

exports.memUtils = function(callback){

  
    require('child_process').exec('vmstat', function(error, stdout, stderr) {
        
        var lines = stdout.split("\n");
        var str_mem_info = lines[2].replace(/^\s+|\s+$/g,'').replace( /[\s\n\r]+/g,' ');
        
        var mem_info = str_mem_info.split(' ') ;
       
        var memutils = []
        memutils[0] = _os.totalmem() / 1024 ;  // total
        memutils[1] = parseFloat(mem_info[2])  // swpt
        memutils[2] = parseFloat(mem_info[3])  // free
        memutils[3] = parseFloat(mem_info[4])  // buff 物理内存用来缓存读写操作的buffer大小
        memutils[4] = parseFloat(mem_info[5])  // cache 物理内存用来缓存进程地址空间的cache大小
        memutils[5] = parseFloat(mem_info[6])  // swap si 数据从 SWAP 读取到 RAM（swap in）的大小，KB 为单位 
        memutils[6] = parseFloat(mem_info[7])  // swap so 数据从 RAM 写到 SWAP（swap out）的大小，KB 为单位
        memutils[7] = parseFloat(mem_info[8])  // io bi  块设备每秒接收的块数量
        memutils[8] = parseFloat(mem_info[9])  // io bo  块设备每秒发送的块数量
        
        callback(memutils);
     });
}


// Network

exports.networkUtils = function(callback){ 
    getNetworkUsage(callback, false);
}

function getNetworkUsage(callback){ 

    require('child_process').exec('cat /proc/net/dev | grep eth0', function(error, stdout, stderr) {        
        var str_net_info = stdout.replace(/^\s+|\s+$/g,'').replace( /[\s\n\r]+/g,' ');
        var net_info = str_net_info.split(' ') ;

        var Receive_bytes = net_info[1];
        var Receive_packets = net_info[2];
        var Transmit_bytes = net_info[9];
        var Transmit_packets = net_info[10]

        return Receive_bytes
    })
        
    setTimeout(function() {
        require('child_process').exec('cat /proc/net/dev | grep eth0', function(error, stdout, stderr) {        
            var str_net_info2 = stdout.replace(/^\s+|\s+$/g,'').replace( /[\s\n\r]+/g,' ');
            var net_info2 = str_net_info.split(' ') ;
    
            var Receive_bytes2 = net_info2[1];
            var Receive_packets2 = net_info2[2];
            var Transmit_bytes2 = net_info2[9];
            var Transmit_packets2 = net_info2[10]

            return Receive_bytes2           
        });           
    }, 1000 );

    Receive_bytes3 = Receive_bytes2 - Receive_bytes
    callback(Receive_bytes3);
}


// Memory
exports.freemem = function(){
    return _os.freemem() / ( 1024 * 1024 );
}

exports.totalmem = function(){

    return _os.totalmem() / ( 1024 * 1024 );
}

exports.freememPercentage = function(){
    return _os.freemem() / _os.totalmem();
}

exports.freeCommand = function(callback){
    
    // Only Linux
    require('child_process').exec('free -m', function(error, stdout, stderr) {
       
       var lines = stdout.split("\n");
       
       
       var str_mem_info = lines[1].replace( /[\s\n\r]+/g,' ');
       
       var mem_info = str_mem_info.split(' ')
      
       total_mem    = parseFloat(mem_info[1])
       free_mem     = parseFloat(mem_info[3])
       buffers_mem  = parseFloat(mem_info[5])
       cached_mem   = parseFloat(mem_info[6])
       
       used_mem = total_mem - (free_mem + buffers_mem + cached_mem)
       
       callback(used_mem -2);
    });
}


// Hard Disk Drive
exports.harddrive = function(callback){
    
    require('child_process').exec('df -k', function(error, stdout, stderr) {
    
        var total = 0;
        var used = 0;
        var free = 0;
    
        var lines = stdout.split("\n");
    
        var str_disk_info = lines[1].replace( /[\s\n\r]+/g,' ');
    
        var disk_info = str_disk_info.split(' ');

        total = Math.ceil((disk_info[1] * 1024)/ Math.pow(1024,2));
        used = Math.ceil(disk_info[2] * 1024 / Math.pow(1024,2)) ;
        free = Math.ceil(disk_info[3] * 1024 / Math.pow(1024,2)) ;

        callback(total, free, used);
    });
}



// Return process running current 
exports.getProcesses = function(nProcess, callback){
    
    // if nprocess is undefined then is function
    if(typeof nProcess === 'function'){
        
        callback =nProcess; 
        nProcess = 0
    }   
    
    command = 'ps -eo pcpu,pmem,time,args | sort -k 1 -r | head -n'+10
    //command = 'ps aux | head -n '+ 11
    //command = 'ps aux | head -n '+ (nProcess + 1)
    if (nProcess > 0)
        command = 'ps -eo pcpu,pmem,time,args | sort -k 1 -r | head -n'+(nProcess + 1)
    
    require('child_process').exec(command, function(error, stdout, stderr) {
    
        var that = this
        
        var lines = stdout.split("\n");
        lines.shift()
        lines.pop()
       
        var result = ''
        
        
        lines.forEach(function(_item,_i){
            
            var _str = _item.replace( /[\s\n\r]+/g,' ');
            
            _str = _str.split(' ')
            
            // result += _str[10]+" "+_str[9]+" "+_str[2]+" "+_str[3]+"\n";  // process               
            result += _str[1]+" "+_str[2]+" "+_str[3]+" "+_str[4].substring((_str[4].length - 25))+"\n";  // process               
               
        });
        
        callback(result);
    }); 
}



/*
* Returns All the load average usage for 1, 5 or 15 minutes.
*/
exports.allLoadavg = function(){ 
    
    var loads = _os.loadavg();
    		
    return loads[0].toFixed(4)+','+loads[1].toFixed(4)+','+loads[2].toFixed(4); 
}

/*
* Returns the load average usage for 1, 5 or 15 minutes.
*/
exports.loadavg = function(_time){ 

    if(_time === undefined || (_time !== 5 && _time !== 15) ) _time = 1;
	
    var loads = _os.loadavg();
    var v = 0;
    if(_time == 1) v = loads[0];
    if(_time == 5) v = loads[1];
    if(_time == 15) v = loads[2];
		
    return v; 
}


exports.cpuFree = function(callback){ 
    getCPUUsage(callback, true);
}

exports.cpuUsage = function(callback){ 
    getCPUUsage(callback, false);
}

function getCPUUsage(callback, free){ 
	
    var stats1 = getCPUInfo();
    var startIdle = stats1.idle;
    var startTotal = stats1.total;
	
    setTimeout(function() {
        var stats2 = getCPUInfo();
        var endIdle = stats2.idle;
        var endTotal = stats2.total;
		
        var idle 	= endIdle - startIdle;
        var total 	= endTotal - startTotal;
        var perc	= idle / total;
	  	
        if(free === true)
            callback( perc );
        else
            callback( (1 - perc) );
	  		
    }, 1000 );
}

function getCPUInfo(callback){ 
    var cpus = _os.cpus();
	
    var user = 0;
    var nice = 0;
    var sys = 0;
    var idle = 0;
    var irq = 0;
    var total = 0;
	
    for(var cpu in cpus){
        if (!cpus.hasOwnProperty(cpu)) continue;	
        user += cpus[cpu].times.user;
        nice += cpus[cpu].times.nice;
        sys += cpus[cpu].times.sys;
        irq += cpus[cpu].times.irq;
        idle += cpus[cpu].times.idle;
    }
	
    var total = user + nice + sys + idle + irq;
	
    return {
        'idle': idle, 
        'total': total
    };
}
