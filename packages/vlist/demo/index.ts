import { faker } from '@faker-js/faker';
import { createVList } from '../src';
import { setStyle } from './style';

const ITEM_HEIGHT = 40;
const ITEM_COUNT = 1000;

const stage = document.createElement('div');
stage.id = 'stage';
document.body.appendChild(stage);

setStyle(ITEM_HEIGHT);

type IUser = {
  name: string;
  email: string;
  avatar: string;
}

const itemData: IUser[] = [];
for (let i = 0; i < ITEM_COUNT; i += 1) {
  itemData.push({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
  });
}

const vlist = createVList('100%', stage, {
  itemRenderer: (startIndex, endIndex) => {
    const items : HTMLElement[] = [];
    for (let i = startIndex; i <= endIndex; i += 1) {
      const { name, email, avatar } = itemData[i];
      const item = document.createElement('div');
      item.className = i === ITEM_COUNT - 1 ? 'item last' : 'item';
      item.innerHTML = `
      <div class="avatar-wrapper">
        <img class="avatar" alt="" src="${avatar}" />
      </div>
      <div>
        <p class="name">${name}</p>
        <p class="email">${email}</p>
      </div>
      `;
      items.push(item);
    }

    return items;
  },
  itemHeight: ITEM_HEIGHT,
  itemCount: ITEM_COUNT,
});

vlist.content.style.paddingRight = '15px';
vlist.container.style.border = '1px solid black';
