export default class Disposable {
  protected disposer: (() => void)[] = [];

  public dispose() {
    this.disposer.forEach((disposerFn) => disposerFn());
  }
}
