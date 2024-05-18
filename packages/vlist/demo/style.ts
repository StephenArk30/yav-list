export function setStyle(itemHeight: number) {
  const stylesheet = new CSSStyleSheet();
  stylesheet.replaceSync(`
  html { height: 100% }
  body { height: 100%; margin: 0; }
  #stage {
    width: 300px;
    height: 400px;
    margin: auto;
    padding-top: 50px;
  }

  .item {
    height: ${itemHeight}px;
    display: flex;
    padding: 5px 10px 4px;
    box-sizing: border-box;
    border-bottom: 1px solid black;
  }

  .item.last {
    padding: 5px 10px;
    border-bottom: none;
  }

  .item * {
    margin: 0;
    user-select: none;
  }

  .item .avatar-wrapper {
    display: flex;
    align-items: center;
    margin-right: 15px;
  }

  .item .avatar {
    width: 16px;
    height: 16px;
    border-radius: 50%;
  }

  .item .name {
    font-size: 12px;
    font-weight: bold;
  }

  .item .email {
    font-size: 10px;
    margin-top: 4px;
  }
  `);

  document.adoptedStyleSheets = [stylesheet];
}
