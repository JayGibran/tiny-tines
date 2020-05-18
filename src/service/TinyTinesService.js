const { getData } = require('../utils/http');
const {IsJsonString, fileExists,  loadFile } = require('../utils/files');
const FileError = require('../error/FileError');

class TinyTines {
  resolve(path, obj) {
    return path.split('.').reduce(function(prev, curr) {
        return prev ? prev[curr] : null
    }, obj || self)
  }
  
  stringFormatter(newString, data) {
    if((data.length === 0) || (!newString.includes("{"))) return newString;
    const matchers = newString.match(/{{.*?\}}/g);
    for(const matcher of matchers){
      newString = newString.replace(matcher, this.resolve(matcher.replace("{{ ", "").replace(" }}", ""), data));
    }
    return newString;
  }

  async execute(pathJsonFile){
    
    if(!pathJsonFile) throw new FileError('You must add path of json');
    
    if(!fileExists(pathJsonFile)) throw new FileError('File does not exists');
  
    if(!IsJsonString(pathJsonFile)) throw new FileError('It is not a valid json');
    
    const { agents } =  loadFile(pathJsonFile);

    let data = {}; 

    for(const agent of agents ){
      if(agent.type === 'HTTPRequestAgent'){
          const url = this.stringFormatter(agent.options.url, data);
          const response = await getData(url);
          Object.assign(data, { [agent.name] : response });
          ///console.log(JSON.stringify(data, null, 4));
      }else if(agent.type === 'PrintAgent'){
        console.log(this.stringFormatter(agent.options.message, data));
      }
    }  
  }
}

module.exports = TinyTines; 