const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const lstat = promisify(fs.lstat);
const readdir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);

const isDirectory = async source => (await lstat(source)).isDirectory();

const getDirectoriesDeep = async source => {
  const items = (await readdir(source)).map(name => path.join(source, name));
  const directories = [];
  for (let item of items) {
    if (await isDirectory(item)) {
      const itemDirectories = await getDirectoriesDeep(item);
      if (itemDirectories.length) {
        directories.push.apply(directories, itemDirectories);
      } else {
        directories.push(item);
      }
    }
  }
  return directories;
};

(async () => {
  const localRoot = 'public/katas';
  const publicRoot = localRoot.slice(7);
  const modules = (await getDirectoriesDeep(localRoot)).map(path.relative.bind(null, localRoot));
  await writeFile('src/katas/paths.json', JSON.stringify({ root: publicRoot, modules }));
})();

