/**
 * 拼接 class name
 * @param classNames
 * @returns
 */
function composeClassNames(
  classNames: (string | undefined | boolean)[]
): string {
  return classNames.filter(Boolean).join(' ');
}
