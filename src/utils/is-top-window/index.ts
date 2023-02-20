/**
 * 判断是否是顶级窗口
 * @param window
 * @returns
 */
export function isTopWindows(window: Window) {
  return window.top?.location === window.self?.location;
}
