import { VScroll } from 'yav-list-scroll';
import type { IVScrollOption } from 'yav-list-scroll/src/vscroll';

export interface IVListOption {
  itemRenderer: (startIndex: number, endIndex: number) => HTMLElement[];
  itemHeight: number;
  itemCount: number;
}

export default class VList extends VScroll {
  protected scrollTop = 0;
  // TODO: reuse item
  protected startIndex = 0;
  protected endIndex = 0;
  public readonly content: HTMLDivElement;

  constructor(
    innerContainer: HTMLElement,
    innerContentWrapper: HTMLElement,
    protected readonly listOption: IVListOption,
    scrollOption: IVScrollOption = {},
  ) {
    super(innerContainer, innerContentWrapper, scrollOption);
    this.content = innerContentWrapper.ownerDocument.createElement('div');
    innerContentWrapper.appendChild(this.content);
    this.update();
    this.scroll({});
  }

  protected init() {
    this.initStyle();
    this.addScroller();
    this.disposer.push(this.addEventListeners());
  }

  public get scrollHeight() {
    return this.listOption.itemHeight * this.listOption.itemCount;
  }

  public update() {
    this.maxScrollY = this.scrollHeight - this.container.clientHeight;
    this.scrollbar.update();
    this.scroller.setScrollDistance(this.maxScrollY);
  }

  protected scroll = ({
    x = 0,
    y = 0,
  }) => {
    this.scrollTop = Math.min(this.maxScrollY, Math.max(0, this.scrollTop + y));
    const { itemRenderer, itemHeight, itemCount } = this.listOption;
    const translateY = this.scrollTop % itemHeight;
    const startIndex = (this.scrollTop - translateY) / itemHeight;
    const endIndex = Math.min(itemCount - 1, startIndex + Math.ceil(
      (this.container.clientHeight - (itemHeight - translateY)) / itemHeight,
    ));

    const items = itemRenderer(startIndex, endIndex);
    this.content.replaceChildren(...items);
    this.content.style.transform = `translate(0px, ${-translateY}px)`;

    this.startIndex = startIndex;
    this.endIndex = endIndex;
  };
}
