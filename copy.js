#!/usr/local/bin/node

var fs = require('fs');
var ncp = require('ncp').ncp;

function makeProject() {
  console.log('initializing ur project');

  ncp.limit = 16;
  ncp(__dirname + '/sheen', './public', function(err) {
    if (err) {
      return console.error(err);
    }


    copyFile(__dirname + '/Makefile', './Makefile');
    copyFile(__dirname + '/package.json', './package.json');
    copyFile(__dirname + '/.gitignore', './gitignore');

    console.log('made yr sheen structure!!');
  });
}

function copyFile(source, target) {
  var readStream = fs.createReadStream(source);
  readStream.on("error", function(err) {
    done(err);
  });

  var writeStream = fs.createWriteStream(target);
  writeStream.on("error", function(err) {
    done(err);
  });
  writeStream.on("close", function() {
    done();
  });

  readStream.pipe(writeStream);

  function done(err) {
    if (err) {
      return console.error(err);
    }
  }
}

makeProject();
