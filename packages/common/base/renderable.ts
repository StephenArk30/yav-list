export default class Renderable {
  protected el: HTMLElement;
  private originDisplay: string = null;

  public get $el() {
    return this.el;
  }

  public get clientHeight() {
    return this.getClientHeight();
  }

  public get ownerDocument() {
    return this.el?.ownerDocument || document;
  }

  public get defaultView() {
    return this.ownerDocument.defaultView;
  }

  public hide() {
    this.originDisplay = this.el.style.display;
    this.el.style.display = 'none';
  }
  
  public show() {
    this.el.style.display = this.originDisplay;
  }

  protected getClientHeight() {
    return this.el?.clientHeight || 0;
  }
}
