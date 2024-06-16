Take over scrolling and dragging events, implemented with JS scrolling.

![demo](doc/vscroll.gif)

The advantage of JS taking over is that code can be executed before scrolling occurs. This allows for rendering before scrolling, avoiding situations where scrolling is complete but rendering is not yet finished.