import VScroll from './vscroll';

export function createVScroll(height: string) {
  const container = document.createElement('div');
  container.style.height = height;
  const contentWrapper = document.createElement('div');
  container.appendChild(contentWrapper);
  return new VScroll(container, contentWrapper);
}
