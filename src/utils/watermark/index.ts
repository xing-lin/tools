export interface IWatermarkConfig {
  width?: number;
  height?: number;
  fontSize?: number;
  rotate?: number;
  text?: string;
  x?: number;
  y?: number;
  renderContainer?: HTMLElement;
}

class Watermark {
  // 图案
  $pattern: HTMLCanvasElement;
  $patternContext: CanvasRenderingContext2D;
  // 区域
  $area: HTMLCanvasElement;
  $areaContext: CanvasRenderingContext2D;
  // patternConfig 可以从外面传入，自定义配置
  constructor(patternConfig?: Partial<IWatermarkConfig>) {
    this.$pattern = document.createElement('canvas')!;

    this.$area = document.createElement('canvas');
    this.$area.id = 'canvasWatermark';
    // 移除 scrollbars，否则会出现滚动条
    this.$area.style.display = 'block';
    // this.$area.style.position = 'fixed';
    this.$area.style.position = 'absolute';
    this.$area.style.left = '0px';
    this.$area.style.right = '0px';
    this.$area.style.top = '0px';
    this.$area.style.bottom = '0px';
    this.$area.style.zIndex = '9999999';
    this.$area.style.pointerEvents = 'none';

    this.$patternContext = this.$pattern.getContext('2d')!;
    this.$areaContext = this.$area.getContext('2d')!;
    // 一个容器中的水印只实例化一次
    if (
      !document.getElementById('canvasWatermark') ||
      (patternConfig?.renderContainer instanceof HTMLElement &&
        Array.from(patternConfig?.renderContainer.children).find(
          (item) => item.id === 'canvasWatermark',
        ) == null)
    ) {
      if (patternConfig?.renderContainer instanceof HTMLElement) {
        patternConfig?.renderContainer.appendChild(this.$area);
      } else {
        document.body.appendChild(this.$area);
      }
      const renderContainer = patternConfig?.renderContainer || document.body;

      const defaultConfig =
        renderContainer.clientWidth > 1200
          ? {
              width: 650,
              height: 300,
              text: '紫鸟VPS远程',
              fontSize: 24,
              rotate: 18,
              x: 0,
              y: 200,
              renderContainer,
            }
          : {
              width: 320,
              height: 200,
              text: '紫鸟VPS远程',
              fontSize: 12,
              rotate: 18,
              x: -20,
              y: 100,
              renderContainer,
            };

      const watermarkConfig = Object.assign(defaultConfig, patternConfig);
      watermarkConfig.renderContainer.style.position = 'relative';
      this.init(this.$patternContext, this.$areaContext, watermarkConfig);
      listenWatermark(watermarkConfig.renderContainer);
    }
  }
  init(
    patternContext: CanvasRenderingContext2D,
    areaContext: CanvasRenderingContext2D,
    watermarkConfig: IWatermarkConfig,
  ) {
    this.drawPattern(patternContext, watermarkConfig);
    this.drawArea(areaContext, watermarkConfig);
    this.listenResize(watermarkConfig);
  }
  // 画单个水印来填充整块区域
  drawPattern(
    context: CanvasRenderingContext2D,
    watermarkConfig: IWatermarkConfig,
  ) {
    const { width, height, fontSize, rotate, text, x, y } = watermarkConfig;

    this.$pattern.width = width!;
    this.$pattern.height = height!;
    context.clearRect(0, 0, width!, height!);
    context.font = `bold ${fontSize}px Microsoft Yahei`;
    context.fillStyle = 'rgba(134, 134, 134, 0.2)';
    context.rotate((-Math.PI / 180) * rotate!);
    this.wrapText(context, text!, x!, y!, width!, 30);
    // 设置内容和坐标
    // context.fillText(text, x, y);
  }
  // 填充整块区域
  drawArea(context: CanvasRenderingContext2D, config: IWatermarkConfig) {
    const { width, height, x, y } =
      config.renderContainer!?.getBoundingClientRect();

    // canvas 宽高必须设置具体的数值，设置 vh、100% 没有效果
    this.$area.width = width;
    this.$area.height = height;

    context.clearRect(0, 0, width, height);
    context.fillStyle = context.createPattern(this.$pattern, 'repeat')!;
    context.fillRect(0, 0, width, height);
  }
  // 监听窗口大小
  listenResize(watermarkConfig: IWatermarkConfig) {
    window.addEventListener('resize', () => {
      this.drawArea(this.$areaContext, watermarkConfig);
    });
  }
  wrapText(
    context: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
  ) {
    const cars = text.split('\n');

    for (let ii = 0; ii < cars.length; ii++) {
      let line = '';
      const words = cars[ii].split(' ');

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth) {
          context.fillText(line, x, y);
          line = words[n] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }

      context.fillText(line, x, y);
      y += lineHeight;
    }
  }
}

export default Watermark;

function listenWatermark(dom: HTMLElement) {
  const _watermark = Array.from(dom.children).find(
    (item) => item?.id === 'canvasWatermark',
  )!;

  const _style = _watermark.getAttribute('style')!;
  const observer = new MutationObserver(function () {
    if (
      !Array.from(dom.children).find((item) => item?.id === 'canvasWatermark')!
    ) {
      dom.appendChild(_watermark);
      return;
    }
    if (_watermark.getAttribute('style') !== _style) {
      _watermark.setAttribute('style', _style);
      return;
    }
  });

  observer.observe(dom, {
    attributes: true, // 是否观察目标节点的属性变化，例如 style、class
    subtree: true, // 除了目标节点，是否观察目标节点的字数
    childList: true, // 表示修改目标节点的子节点是否触发事件变化
  });
}
