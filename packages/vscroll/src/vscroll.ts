import Disposable from 'yav-list-common/base/disposable';
import { throttle } from 'lodash-es';
import Scrollbar from './scrollbar';

const inRange = (val: number, max: number, min: number) => Math.max(min, Math.min(val, max));

export interface IVScrollOption {
  // to be impl
}

export default class VScroll extends Disposable {
  protected scrollbar: Scrollbar;
  protected maxScrollY: number;

  constructor(
    private readonly innerContainer: HTMLElement,
    private readonly innerContentWrapper: HTMLElement,
    private readonly options: IVScrollOption = {},
  ) {
    super();
    if (!this.container.contains(this.contentWrapper)) {
      console.warn(this.contentWrapper, 'is not a child of', this.container);
      console.warn('`container.appendChild(contentWrapper)` will be executed');
      this.container.appendChild(this.contentWrapper);
    }
    this.initStyle();
    this.update();
    this.addEventListeners();
    this.addScroller();
  }

  public get container() { return this.innerContainer; }
  public get contentWrapper() { return this.innerContentWrapper; }

  // note that paddings will mass up everything (borders are fine)
  public update() {
    this.maxScrollY = this.contentWrapper.scrollHeight - this.container.clientHeight;
  }

  protected initStyle() {
    this.container.style.overflow = 'hidden';
    this.container.style.position = 'relative';
    this.contentWrapper.style.position = 'absolute';
    this.contentWrapper.style.width = '100%';
  }

  protected move(el: HTMLElement, { x = 0, y = 0 }) {
    const { transform } = el.ownerDocument.defaultView.getComputedStyle(el);
    if (transform === 'none') {
      el.style.transform = `translate(0px, ${-inRange(-y, this.maxScrollY, 0)}px)`;
      return;
    }

    let nextTransform = '';
    const reg = /(\w+)\(([^)]*)\)/g;
    for (let match = reg.exec(transform); match; match = reg.exec(transform)) {
      const [_, name, val] = match;
      switch (name) {
      // you will always get 'matrix' in computed style
      case 'matrix':
      case 'matrix3d': {
        const matrix = val.split(',');
        const addDelta = (i: number, delta: number, max: number, min: number) => {
          if (delta === 0) return;
          const t = parseFloat(matrix[i]);
          const nextScroll = inRange(-(t + delta), max, min);
          matrix[i] = `${-nextScroll}`;
        };
        addDelta(name === 'matrix' ? 4 : 12, x, 0, 0); // not impl
        addDelta(name === 'matrix' ? 5 : 13, y, this.maxScrollY, 0);
        nextTransform = `${nextTransform} ${name}(${matrix.join(', ')})`;
        break;
      }
      default:
        nextTransform = `${nextTransform} ${name}(${val})`;
        break;
      }

      el.style.transform = nextTransform;
    }
  }

  protected onWheel = throttle((e: WheelEvent) => {
    const { deltaY } = e;
    this.move(this.contentWrapper, { y: -deltaY });
  }, 10);

  protected addEventListeners() {
    this.contentWrapper.addEventListener('wheel', this.onWheel);
    return () => {
      this.contentWrapper.removeEventListener('wheel', this.onWheel);
    };
  }

  protected addScroller() {
    this.scrollbar = new Scrollbar(this.container);
  }
}
