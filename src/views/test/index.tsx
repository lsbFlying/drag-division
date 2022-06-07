import * as React from "react";
import { Wrap } from "./styled";
import { DragDivision } from "../../components";

type Props = {
  /** 数据??? */
};
interface State {
  /** 数据??? */
}

/**
 * 类测试组件模板 TestClass
 * created by liushanbao
 * @author liushanbao
 * @class TestClass
 */
export default class TestClass extends React.PureComponent<Props, State> {
  static defaultProps = {};

  state: State = {};
  
  render() {
    return (
      <Wrap>
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
      </Wrap>
    );
  }
}
