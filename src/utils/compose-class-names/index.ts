/**
 * 拼接 class name
 * @param classNames
 * @returns
 */
function composeClassNames(
  classNames: (string | undefined | boolean)[]
): string {
  let className = '';
  if (Array.isArray(classNames)) {
    className = classNames.filter(Boolean).join(' ');
  }
  return className;
}
