 var gulp = require('gulp'),
     browserSync = require('browser-Sync'),
     git = require('gulp-git'),
     gulpclean = require('gulp-clean');
 

gulp.task('init', function(){
  git.init({args:'options'},function (err) {
    if (err) throw err;
  });
});
 
//  git add 
gulp.task('add', function(){
  return gulp.src('./*')
    .pipe(git.add({args: '-A -f'}));
 
});
 

 //  删除 
 gulp.task('rm', function(){
   return gulp.src('./*')
     .pipe(git.rm({args:'-r --cached'}));
 });
  

//  提交文件至暂存区 
gulp.task('commit', function(){
  return gulp.src('./*')
      .pipe(git.commit('initial commit', {args: '-m'}));
});
 
// Run git remote add 
// remote is the remote repo 
// repo is the https url of the repo 
gulp.task('addremote', function(){
  git.addRemote('origin', 'https://github.com/svchostrs/gulpweb.git', function (err) {
    if (err) throw err;
  });
});
 
// Run git remote remove 
// remote is the remote repo 
gulp.task('removeremote', function(){
  git.removeRemote('origin', function (err) {
    if (err) throw err;
  });
});
 
// Run git push 
// branch is the current branch & remote branch to push to 
gulp.task('push', function(){
  git.push('origin',function (err) {
    if (err) throw err;
  });
});
 
 
// Run git pull 
// remote is the remote repo 
// branch is the remote branch to pull from 
gulp.task('pull', function(){
  git.pull('origin', 'master', {args: '--rebase'}, function (err) {
    if (err) throw err;
  });
});
 
// Run git pull from multiple branches 
gulp.task('pull', function(){
  git.pull('origin', ['master', 'develop'], function (err) {
    if (err) throw err;
  });
});
 
// Run git fetch 
// Fetch refs from all remotes 
gulp.task('fetch', function(){
  git.fetch('', '', {args: '--all'}, function (err) {
    if (err) throw err;
  });
});
 
// Run git fetch 
// Fetch refs from origin 
gulp.task('fetch', function(){
  git.fetch('origin', '', function (err) {
    if (err) throw err;
  });
});
 
// Clone a remote repo 
gulp.task('clone', function(){
  git.clone('https://github.com/svchostrs/gulptask', function (err) {
    if (err) throw err;
  });
});
 
// Clone remote repo to sub folder ($CWD/sub/folder/git-test) 
gulp.task('clonesub', function() {
  git.clone('https://github.com/svchostrs/git-test', {args: './sub/folder'}, function(err) {
    // handle err 
  });
});
 
// Tag the repo with a version 
gulp.task('tag', function(){
  git.tag('v1.1.1', 'Version message', function (err) {
    if (err) throw err;
  });
});
 
// Tag the repo with a version and empty message 
gulp.task('tag', function(){
  git.tag('v1.1.1', '', function (err) {
    if (err) throw err;
  });
});
 
// Tag the repo With signed key 
gulp.task('tagsec', function(){
  git.tag('v1.1.1', 'Version message with signed key', {signed: true}, function (err) {
    if (err) throw err;
  });
});
 
// Create a git branch 
gulp.task('branch', function(){
  git.branch('newBranch', function (err) {
    if (err) throw err;
  });
});
 
// Checkout a git branch 
gulp.task('checkout', function(){
  git.checkout('branchName', function (err) {
    if (err) throw err;
  });
});
 
// Create and switch to a git branch 
gulp.task('checkout', function(){
  git.checkout('branchName', {args:'-b'}, function (err) {
    if (err) throw err;
  });
});
 
// Merge branches to master 
gulp.task('merge', function(){
  git.merge('branchName', function (err) {
    if (err) throw err;
  });
});
 
// Reset a commit 
gulp.task('reset', function(){
  git.reset('SHA', function (err) {
    if (err) throw err;
  });
});
 
// Show the formatted git diff 
gulp.task('diff', function(){
  gulp.src('./*')
    .pipe(git.diff('master', {log: true}))
    .pipe(gulp.dest('./diff.out'));
});
 

gulp.task('addSubmodule', function(){
  git.addSubmodule('https://github.com/svchostrs/gulptask', 'gulptask', { args: '-b master'});
});
 
gulp.task('updateSubmodules', function(){
  git.updateSubmodule({ args: '--init' });
});
 
// Working tree status 
gulp.task('status', function(){
  git.status({args: '--porcelain'}, function (err, stdout) {
    if (err) throw err;
  });
});
 
// Other actions that do not require a Vinyl 
gulp.task('log', function(){
  git.exec({args : 'log --follow index.js'}, function (err, stdout) {
    if (err) throw err;
  });
});

//  上传文件
gulp.task('forgit',['add','commit','push'],()=>{

}); 

 gulp.task('cleangit', function() {
   return gulp.src(['hooks/','info/','objects/','options/','refs/','sub/'])
    .pipe(gulpclean());
 });

