const TinyTinesService = require('./service/TinyTinesService');

const tinyTinesService = new TinyTinesService();

async function main() {
  const pathJsonFile = process.argv[2];
  
  await tinyTinesService.execute(pathJsonFile);
  
}

main();


