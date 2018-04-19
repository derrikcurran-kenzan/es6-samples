const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const lstat = promisify(fs.lstat);
const readdir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);

const isDirectory = async source => (await lstat(source)).isDirectory();

const getFilesDeep = async source => {
  const items = (await readdir(source)).map(name => path.join(source, name));
  const files = [];
  for (let item of items) {
    if (await isDirectory(item)) {
      files.push.apply(files, await getFilesDeep(item));
    } else {
      files.push(item);
    }
  }
  return files;
};

(async () => {
  const localRoot = 'public/code-samples';
  const publicRoot = localRoot.slice(7);
  const samples = (await getFilesDeep(localRoot)).map(path.relative.bind(null, localRoot));
  await writeFile('src/code-samples/codeSamplePaths.json', JSON.stringify({ root: publicRoot, samples }));
})();

