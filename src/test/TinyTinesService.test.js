'use strict';

const TinyTinesService = require('../service/TinyTinesService');
const FileError = require('../error/FileError');
const path = require('path')
const json = require('../tiny-tines-sunset.json');

jest.mock('fs');

describe('TinyTinesService', () => {

   const MOCK_FILE_INFO = {
    [path.resolve(__dirname, '..','test.txt')] : {},
    [path.resolve(__dirname, '..','test.json')]: JSON.stringify({test : {test : 'test'}}),
    [path.resolve(__dirname, '..','tiny-tines-sunset.json')]: JSON.stringify(json)
  };
  
  beforeEach(() => {
    // Set up some mocked out file info before each test
    require('fs').__setMockFiles(MOCK_FILE_INFO);
  });

  it('should not be able to load files without path', async () => {
    const tinyTinesService = new TinyTinesService();
      await expect(tinyTinesService.execute(""))
      .rejects.toThrow(new FileError('You must add path of json'));
  });

  it('should not be able to load files if json does not exists', async () => {
    const tinyTinesService = new TinyTinesService();
      await expect(tinyTinesService.execute("test.json"))
      .rejects.toThrow(new FileError('File does not exists'));
  });

  it('should not be able to load file if is not a valid json', async () => {
    const tinyTinesService = new TinyTinesService();
      await expect(tinyTinesService.execute(path.resolve(__dirname, '..','test.txt')))
       .rejects.toThrow(new FileError('It is not a valid json'));
  });

  it('should not be able to run if agent is not present', async () => {
    const tinyTinesService = new TinyTinesService();
      await expect(tinyTinesService.execute(path.resolve(__dirname, '..','test.json')))
       .rejects.toThrow(new FileError('Malformed json'));
  });

  it('should be able to load files and print message in console', async () => {
    const tinyTinesService = new TinyTinesService();
      const consoleSpy = jest.spyOn(console, 'log');  
      await tinyTinesService.execute(path.resolve(__dirname, '..','tiny-tines-sunset.json'));
      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Sunset in Dublin'));   
  });
});