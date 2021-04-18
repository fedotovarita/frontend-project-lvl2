/* eslint-disable no-undef */
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import generateDiffs from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const expectedStylish = readFile('expected.txt');
const expectedPlain = readFile('expectedPlain.txt');
const expectedJson = readFile('expectedJson.txt');

test.each(['json', 'yml'])('%s test', (format = 'stylish') => {
  const file1 = getFixturePath(`data1.${format}`);
  const file2 = getFixturePath(`data2.${format}`);
  expect(generateDiffs(file1, file2, 'stylish')).toEqual(expectedStylish);
  expect(generateDiffs(file1, file2, 'plain')).toEqual(expectedPlain);
  expect(generateDiffs(file1, file2, 'json')).toEqual(expectedJson);
});
