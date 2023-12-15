import { createVScroll } from '../src/index';

document.documentElement.style.height = '100%';
document.body.style.height = '100%';
document.body.style.margin = '0';

const stage = document.createElement('div');
stage.style.cssText = 'width: 300px; height: 400px; margin: auto; padding-top: 50px;';
document.body.appendChild(stage);

const vscroll = createVScroll('100%');
stage.appendChild(vscroll.container);
vscroll.container.style.border = '1px solid black';

const content = document.createElement('div');
vscroll.contentWrapper.appendChild(content);
content.style.cssText = 'height: 1000px; background: linear-gradient(red, orange, yellow);';

vscroll.update();
