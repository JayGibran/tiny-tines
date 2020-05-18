'use strict';

const TinyTinesService = require('../service/TinyTinesService');
const FileError = require('../error/FileError');
const path = require('path')

jest.mock('fs');

describe('TinyTinesService', () => {

  const MOCK_FILE_INFO = {
    [path.resolve(__dirname, '..','test.txt')] : 'mockedFile',
  };


  beforeEach(() => {
    // Set up some mocked out file info before each test
    require('./fs').__setMockFiles(MOCK_FILE_INFO);

    jest.mock(path.resolve(__dirname, '..','test.txt'), ()=> 'Test' , { virtual: true })
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

  it('should not be able to load files if is not a valid json', async () => {
    const tinyTinesService = new TinyTinesService();
      await expect(tinyTinesService.execute("src/test.txt"))
      .rejects.toThrow(new FileError('It is not a valid json'));
  });
});