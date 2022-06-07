<div align="center">
<h1>DragDivision</h1>
</div>

## DragDivision
分割拖拽组件，可上下方向分割拖拽，左右方向分割拖拽，可十字交叉垂直与水平方向双向拖拽
注意：容器层本身继承父节点的宽高，父节点或者容器层本身的宽高不能变化，否则会影响拖拽效果布局

## Install
```sh
npm i drag-division
```

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

## License
[MIT License](https://github.com/lsbFlying/drag-division/blob/master/LICENSE) (c) [刘善保](https://github.com/lsbFlying)
