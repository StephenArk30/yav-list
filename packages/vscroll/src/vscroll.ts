import Disposable from 'yav-list-common/base/disposable';
import { throttle } from 'lodash-es';
import Scrollbar from './scrollbar';
import move from './move';

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
    this.disposer.push(this.addEventListeners());
    this.addScroller();
    this.update();
  }

  public get container() { return this.innerContainer; }
  public get contentWrapper() { return this.innerContentWrapper; }

  private get scroller() {
    return this.scrollbar.scroller;
  }

  // note that paddings will mass up everything (borders are fine)
  public update() {
    this.maxScrollY = this.contentWrapper.scrollHeight - this.container.clientHeight;
    this.scrollbar.update();
    this.scroller.setScrollDistance(this.maxScrollY);
  }

  protected initStyle() {
    this.container.style.overflow = 'hidden';
    this.container.style.position = 'relative';
    this.contentWrapper.style.width = '100%';
  }

  protected onWheel = throttle((e: WheelEvent) => {
    const { deltaY } = e;
    move(this.contentWrapper, { y: -deltaY }, {
      minY: -this.maxScrollY,
      maxY: 0,
    });
    this.scroller.onWheel(deltaY);
  }, 10);

  protected addEventListeners() {
    this.contentWrapper.addEventListener('wheel', this.onWheel);
    return () => {
      this.contentWrapper.removeEventListener('wheel', this.onWheel);
    };
  }

  protected addScroller() {
    this.scrollbar = new Scrollbar(this.container);
    this.disposer.push(() => this.scrollbar.dispose());
  }
}
