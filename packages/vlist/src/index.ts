import VList, { IVListOption } from './vlist';

export function createVList(height: string, parent: HTMLElement, option: IVListOption) {
  const container = document.createElement('div');
  container.style.height = height;
  const contentWrapper = document.createElement('div');
  container.appendChild(contentWrapper);
  parent.appendChild(container);
  return new VList(container, contentWrapper, option);
}

export { VList };
