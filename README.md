# exapp

cd /Users/apple/keys/vsproject/exapp
1. git init # 当前目录新建.git 目录

2. 添加不打算提交的目录和文件

```sh 
#vi .gitignore 
node_modules
.gitignore
.git
```
3. git add -A  #或 VScode 操作：暂存当前目录的改变 

4. git commit -m "first commit"  #或 VScode 操作：提交改变 

5. git remote add origin https://github.com/ddkaty/exapp.git

6. git push -u origin master

7. 更新操作：
远程分支列表
``` sh
git branch -r
```
安全方式：
```sh 
git fetch origin master:tmp
git diff tmp 
git merge tmp
```
快捷方式：
```sh 
 git pull origin master
```