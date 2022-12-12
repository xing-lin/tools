import { Path } from './index';

export function createPath({
  pathname = '/',
  search = '',
  hash = '',
}: Partial<Path>) {
  if (search && search !== '?')
    pathname += search.charAt(0) === '?' ? search : '?' + search;
  if (hash && hash !== '#')
    pathname += hash.charAt(0) === '#' ? hash : '#' + hash;
  return pathname;
}
