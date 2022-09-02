import Fuse from 'fuse.js';

const options = {
  includeScore: true,
  keys: ['participantsNames', 'title', 'formatedDate'],
};

function filterEventsList<T>(str: string, list: T[]): T[] {
  const fuse = new Fuse(list, options);
  const result = fuse.search(str);
  return result.map(({ item }) => item);
}

export default filterEventsList;
