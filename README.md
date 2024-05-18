# Getting Start

```shell
npm install yav-list
```

```html
<div id="container">
  <div id="contentWrapper"></div>
</div>
```

```js
import { VList } from 'yav-list';

const vlist = new VList($('#container'), $('contentWrapper'), {
  itemRenderer: (startIndex, endIndex) => {
    const items = [];
    for (let i = startIndex; i <= endIndex; i += 1) {
      items.push(RENDER_ITEM(i)); // create an item
    }
    return items;
  },
  itemHeight: 50, // 50px height
  itemCount: 100000,
});
```
