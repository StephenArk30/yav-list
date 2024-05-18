import type { IDisposable } from 'yav-list-common/base/disposable';
import Renderable from 'yav-list-common/base/renderable';
import move from './move';

export interface IScrollerOption {
  minHeight: number;
}

const DEFAULT_SCROLLER_OPTIONS: IScrollerOption = {
  minHeight: 20,
};

interface IDnD {
  startY: number;
  deltaY: number;
}

export default class Scroller extends Renderable implements IDisposable {
  private options: IScrollerOption;
  private disposer: (() => void)[] = [];
  private dnd: IDnD;
  private scrollStep = 0;
  private maxScrollY = 0;

  constructor(
    private readonly parent: Renderable,
    options: Partial<IScrollerOption> = {},
  ) {
    super();

    this.options = {
      ...DEFAULT_SCROLLER_OPTIONS,
      ...options,
    };
    this.init();
  }

  public dispose() {
    this.disposer.forEach((d) => d());
  }

  /**
   * @param maxScrollDistance the max scroll distance of content
   */
  public setScrollDistance(maxScrollDistance: number) {
    const height = Math.max(this.parent.clientHeight - maxScrollDistance, this.options.minHeight);
    this.el.style.height = `${height}px`;

    if (maxScrollDistance <= 0 || height >= this.parent.clientHeight) {
      this.scrollStep = 0;
      this.hide();
    } else {
      this.maxScrollY = this.parent.clientHeight - height;
      // content scroll 1px, scroller should scroll ${scrollStep}px
      this.scrollStep = this.maxScrollY / maxScrollDistance;
      this.show();
    }
  }

  public onWheel(dy: number) {
    move(this.el, { y: dy * this.scrollStep }, { maxY: this.maxScrollY });
  }

  protected init() {
    this.el = this.parent.$el.ownerDocument.createElement('div');
    this.parent.$el.appendChild(this.el);
    this.initStyle();
    this.disposer.push(this.addEventListeners());
  }

  protected initStyle() {
    this.el.style.width = '100%';
    this.el.style.background = 'rgba(0, 0, 0)';
    this.el.style.opacity = '0.4';
  }

  protected addEventListeners() {
    this.$el.addEventListener('mousedown', this.onMouseDown);
    this.ownerDocument.addEventListener('mouseup', this.onMouseUp);
    return () => {
      this.$el.removeEventListener('mousedown', this.onMouseDown);
      this.ownerDocument.removeEventListener('mouseup', this.onMouseUp);
    };
  }

  protected onMouseDown = (e: MouseEvent) => {
    this.$el.style.opacity = '0.6';
    this.dnd = {
      startY: e.clientY,
      deltaY: 0,
    };
  };

  protected onMouseUp = (e: MouseEvent) => {
    this.$el.style.opacity = '0.4';
  };

  protected onMouseMove = (e: MouseEvent) => {
    const { clientY } = e;
    this.dnd.deltaY = clientY - this.dnd.startY;
  };
}
