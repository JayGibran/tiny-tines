'use strict';
const fs = require('fs');

module.exports = {
  loadFile (path) {
    try {
      return JSON.parse(fs.readFileSync(path));;
    } catch (e) {
        return {agents : [ ]};
    }
  },
  fileExists(path){    
    try {
      if(fs.existsSync(path)) {
        return true
      } else {
        return false
      }
    } catch (err) {
      return false
    }
  },
  IsJsonObject(path) {
    try {
      JSON.parse(fs.readFileSync(path));
    } catch (e) {
        return false;
    }
    return true;
  }
}