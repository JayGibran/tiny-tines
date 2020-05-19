const path = require('path');

const fs = jest.genMockFromModule('fs');

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles = Object.create(null);
function __setMockFiles(newMockFiles) {
  mockFiles = Object.assign(newMockFiles);

}

function existsSync(file) {
  return mockFiles[file];
}

function readFileSync(file){
  return mockFiles[file];
}

fs.__setMockFiles = __setMockFiles;
fs.existsSync = existsSync;
fs.readFileSync = readFileSync;

module.exports = fs;