export interface IDisposable {
  dispose: () => void;
}

export default class Disposable implements IDisposable {
  protected disposer: (() => void)[] = [];

  public dispose() {
    this.disposer.forEach((disposerFn) => disposerFn());
  }
}
