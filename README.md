<div align="center">
<h1>DragDivision</h1>
</div>

## DragDivision
分割拖拽组件，可上下方向分割拖拽，左右方向分割拖拽，可十字交叉垂直与水平方向双向拖拽
(注意：容器层本身继承父节点的宽高，父节点或者容器层本身的宽高不能变化，否则会影响拖拽效果布局)

## Install
```sh
npm i drag-division
```

## npm start
Runs the app in the development mode.

## Demo
Start this project and then run the app in the development mode.
Then open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage
```tsx
import { DragDivision } from "drag-division";
function App() {
  return (
    <DragDivision
      topNode={<div className="topDiv">123</div>}
      bottomNode={<div className="bottomDiv">456</div>}
      topMinHeight={"20%"}
      bottomMinHeight={"30%"}
      topHeight="30%"
      // divisionDirection="horizontal"
      // leftNode={<div className="topDiv">123</div>}
      // rightNode={<div className="bottomDiv">456</div>}
      // leftWidth="30%"
      // leftMinWidth={"20%"}
      // rightMinWidth={"30%"}
    />
  );
}
```
## Learn More
Start this project and then run the app in the development mode,
Then open [http://localhost:3000](http://localhost:3000) to view it in the browser.
View the project demo test page's source code, There are many demo examples of function introduction and code

## Description
If the project startup page does not display normally, this problem is caused by the fact that the browser has installed the react devtools extension

Find node_ modules/@pmmmwh/react-refresh-webpack-plugin/client/ReactRefreshEntry. JS file,

Find the error reporting code and directly comment the line causing the error: refreshruntime injectIntoGlobalHook(safeThis);

Then restart. This error is also closely related to the react version. Remember that the old version doesn't seem to have this problem.

In addition, for the version of webpack, there may be related version problems during startup,

Install by specified version: NPM I webpack@4.44.2 -D or remove package You can reinstall the dependency of webpm on webpi

## License

[MIT License](https://gitlab.com/1262300490/awesome-scroll/-/blob/master/LICENSE) (c) [刘善保](https://gitlab.com/1262300490)
