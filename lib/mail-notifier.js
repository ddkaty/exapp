const notifier = require('mail-notifier');
const fs = require('fs');
const pinyin = require("pinyin");
const unzip2 = require("unzip2");
const imgcompress = require('./gulpfile');

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
        mail.attachments.forEach( function(item) {
            console.log(item);
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
        });
    })
    .start();