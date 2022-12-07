/**
 * 计算元素容器内最大的 z-index
 * @param container 元素容器，传入 .demo #demo div，默认body
 * @returns
 */
function computedMaxZIndex(container: string = 'body'): number {
  return Math.max(
    ...Array.from(document.querySelectorAll(`${container} *`), (el) =>
      parseFloat(window.getComputedStyle(el).zIndex)
    ).filter((zIndex) => !Number.isNaN(zIndex)),
    0
  );
}
