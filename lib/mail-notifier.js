const notifier = require('mail-notifier');
const fs = require('fs');
const pinyin = require("pinyin");
const unzip2 = require("unzip2");
const imgcompress = require('./gulpfile');

const log4js = require('log4js');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'log/mail-notifier.log' } },
  categories: { default: { appenders: ['cheese'], level: 'INFO' } }
});

var logger = log4js.getLogger('normal');

var blogdir = "public/blog/html/"
var bloglistfile = "bloglist.txt"

const imap = {
  user: "linklong1000@163.com",
  password: "szkdzz4321",
  host: "imap.163.com",
  port: 993, // imap port
  tls: true,// use secure connection
  tlsOptions: { rejectUnauthorized: false }
};

const n = notifier(imap);
n.on('end', () => n.start()) // session closed
    .on('mail', function(mail) {
        if (mail.subject == "阿里云盾黑洞结束通知") {
            var re =  /IP(\d+)\.(\d+)\.(\d+)\.(\d+)/g
            ip = re.exec(mail.html)[0]
           //console.log() 
           logger.warn("阿里云盾攻击报警："+ip)   ;        
        }
        else if (mail.attachments) {
            mail.attachments.forEach( function(item) {
                
                //console.log(mail.from[0].address, mail.subject);
                name = pinyin(item.fileName.split('.')[0],{
                        style: pinyin.STYLE_FIRST_LETTER
                }).join('')
                fs.writeFileSync(blogdir+name+".zip",item.content);
                fs.createReadStream(blogdir+name+".zip")
                .pipe(unzip2.Extract({ path: blogdir}))
                .on('close', function () {
                        fs.unlink(blogdir+name+".zip")
                        fs.rename(blogdir+item.fileName.split('.')[0], blogdir+name,function(err){
                                if(err)
                                console.log(err)
                        });
                });

                fs.appendFile(blogdir+ bloglistfile, name + "," + item.fileName.split('.')[0] + "," + "http://www.acent.me/blog/html/" + name + "\n" , function (err) {
                    if (err) throw err;
                });
                logger.info(item.fileName+","+item.length+","+"http://www.acent.me/blog/html/" + name );
            });
        }
    })
    .start();