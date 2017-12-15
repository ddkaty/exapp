
一、 操作系统
Linux 性能监控 ： CPU 、Memory 、 IO 、Network : https://www.qcloud.com/community/article/164816001481011819
CPU:https://www.cnblogs.com/xinxinwang/p/4886010.html
Memeory:http://blog.is36.com/linux_free_command_for_memory/
Network:http://www.jianshu.com/p/b9e942f3682c

used=total-free 即 total=used+free
实际内存占用：-buffers/cache 的内存数：95 (等于第1行的 used-buffers-cached 即 total-free-buffers-cached )：反映的是被程序实实在在吃掉的内存
实际可用内存：+buffers/cache 的内存数: 32 (等于第1行的 free + buffers + cached)：反映的是可以挪用的内存总数。





二、 应用
1. nginx：39.108.245.99:curl http://127.0.0.1/nginx_status
2. php-fpm: curl http://127.0.0.1/status 
参考：https://segmentfault.com/a/1190000000630270
3. mysql 慢查询

三、 常用命令：
1. 查看网络连接状态及其数量
netstat -n | awk '/^tcp/ {++S[$NF]} END {for(a in S) print a,S[a]}' 
2. 查看网络连接的IP地址机器数量
" awk '{a[$1]+=1;} END {for(i in a){print a[i]" "i;}}'  ~/Desktop/ip.csv |sort -t " " -k 1 -n -r | more
3. 查看某个进程占用的CPU资源
" while :; do ps -eo pid,ni,pri,pcpu,psr,comm | grep 'db_server_login'; sleep 1; done
