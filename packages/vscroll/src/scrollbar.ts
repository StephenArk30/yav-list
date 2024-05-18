import type { IDisposable } from 'yav-list-common/base/disposable';
import Renderable from 'yav-list-common/base/renderable';
import Scroller from './scroller';

export enum IScrollbarDirection {
  HORIZONTAL,
  VERTICAL, // not impl
}

export interface IScrollbarOption {
  direction?: IScrollbarDirection;
}

export default class Scrollbar extends Renderable implements IDisposable {
  private innerScroller: Scroller;
  private disposer: (() => void)[] = [];

  constructor(
    private readonly container: HTMLElement,
    private readonly options: IScrollbarOption = {},
  ) {
    super();

    if (this.options.direction === IScrollbarDirection.HORIZONTAL) {
      console.warn('horizontal scrollbar has not implemented yet, "direction" will be ignored');
    }
    this.init();
  }

  public get scroller() {
    return this.innerScroller;
  }

  public update() {
    this.el.style.height = this.defaultView.getComputedStyle(this.container).height;
  }

  public dispose() {
    this.disposer.forEach((d) => d());
    this.scroller.dispose();
  }

  protected init() {
    this.el = this.container.ownerDocument.createElement('div');
    this.container.appendChild(this.el);
    this.initStyle();
    this.innerScroller = new Scroller(this);
    this.update();
  }

  protected initStyle() {
    this.el.style.cssText = 'position: absolute; top: 0px; width: 15px; right: 0px; background: rgba(0, 0, 0, 0.1);';
  }
}
