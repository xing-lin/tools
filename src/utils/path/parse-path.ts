import { Path } from './index';

export function parsePath(path: string): Partial<Path> {
  let parsePath: Partial<Path> = {};

  if (path) {
    let hashIndex = path.indexOf('#');
    if (hashIndex >= 0) {
      parsePath.hash = path.substring(hashIndex);
      path = path.substring(0, hashIndex);
    }

    let searchIndex = path.indexOf('?');
    if (searchIndex > 0) {
      parsePath.search = path.substring(searchIndex);
      path = path.substring(0, searchIndex);
    }

    if (path) {
      parsePath.pathname = path;
    }
  }

  return parsePath;
}
