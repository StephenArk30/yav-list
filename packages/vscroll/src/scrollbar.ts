export enum IScrollbarDirection {
  HORIZONTAL,
  VERTICAL, // not impl
}

export interface IScrollbarOption {
  direction?: IScrollbarDirection;
}

export default class Scrollbar {
  private element: HTMLElement;

  constructor(
    private readonly container: HTMLElement,
    private readonly options: IScrollbarOption = {},
  ) {
    if (this.options.direction === IScrollbarDirection.HORIZONTAL) {
      console.warn('horizontal scrollbar has not implemented yet, "direction" will be ignored');
    }
    this.init();
  }

  protected init() {
    this.element = this.ownerDocument.createElement('div');
    this.container.appendChild(this.element);
    this.element.style.position = 'absolute';
    this.element.style.height = this.defaultView.getComputedStyle(this.container).height;
  }

  private get ownerDocument() {
    return this.container.ownerDocument;
  }

  private get defaultView() {
    return this.ownerDocument.defaultView;
  }
}
