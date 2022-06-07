import * as React from "react";
import { DragDivisionWrap } from "./styled";
import { ICSS, ICSSProps } from "../interface";
import uniqueId from "lodash.uniqueid";

export type DivisionDirection = "vertical" | "horizontal" | "cross";

type Props = ICSSProps & {
  /** 分割方向(默认垂直方向分割)*/
  divisionDirection: DivisionDirection;
  /** 分割线所在区域的高度/宽度(默认10px)(不想写百分比了，实在是太麻烦了，就数字像素值吧) */
  splitArea: number;
  /** 垂直方向分割的子元素 */
  topNode?: React.ReactNode;
  /** 垂直方向分割的子元素 */
  bottomNode?: React.ReactNode;
  /** 水平方向分割的子元素 */
  leftNode?: React.ReactNode;
  /** 水平方向分割的子元素 */
  rightNode?: React.ReactNode;
  /** 十字交叉方向分割的子元素 */
  topLeftNode?: React.ReactNode;
  /** 十字交叉方向分割的子元素 */
  topRightNode?: React.ReactNode;
  /** 十字交叉方向分割的子元素 */
  bottomLeftNode?: React.ReactNode;
  /** 十字交叉方向分割的子元素 */
  bottomRightNode?: React.ReactNode;
  /** 十字交叉方向分割子元素样式 */
  crossItemStyle?: React.CSSProperties;
  /** 垂直方向的子元素高度(默认对半)(可以是百分比或者数字像素值，禁止calc) */
  topHeight?: number | string;
  /** 水平方向的子元素宽度(默认对半)(可以是百分比或者数字像素值，禁止calc) */
  leftWidth?: number | string;
  /** 分割拖拽的最小高度/宽度(可以是百分比或者数字像素值，禁止calc) */
  topMinHeight?: number | string;
  /** 分割拖拽的最小高度/宽度(可以是百分比或者数字像素值，禁止calc) */
  bottomMinHeight?: number | string;
  /** 分割拖拽的最小高度/宽度(可以是百分比或者数字像素值，禁止calc) */
  leftMinWidth?: number | string;
  /** 分割拖拽的最小高度/宽度(可以是百分比或者数字像素值，禁止calc) */
  rightMinWidth?: number | string;
  /** 禁用拖拽分割 */
  disabled: boolean;
};
interface State {
  /** id */
  mainId: string;
}

/**
 * 拖拽分割组件
 * created by liushanbao
 * @author liushanbao
 * @class DragDivision
 */
export class DragDivision extends React.PureComponent<Props, State> implements ICSS {
  
  constructor(props: Props) {
    super(props);
    this.state = {
      mainId: uniqueId("DragDivision"),
    };
  }
  
  static defaultProps = {
    divisionDirection: "vertical",
    splitArea: 10,
    disabled: false,
    topHeight: "50%",
    leftWidth: "50%",
  };
  
  /** 每一次点击down的时候的坐标 */
  private initPageY = 0;
  /** 每一次点击down的时候顶部高度 */
  private initTopHeight = 0;
  /** 每一次点击down的时候的坐标 */
  private initPageX = 0;
  /** 每一次点击down的时候左部宽度 */
  private initLeftWidth = 0;
  /** 十字线的缓存定位 */
  private crossCacheLeft = 0;
  /** 十字线的缓存定位 */
  private crossCacheTop = 0;
  
  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
    const {
      disabled, divisionDirection, splitArea, topHeight, leftWidth, topMinHeight, bottomMinHeight, leftMinWidth, rightMinWidth,
    } = this.props;
    if (disabled) return;
    const { mainId } = this.state;
    if (topHeight !== prevProps.topHeight && topHeight && divisionDirection === "vertical") {
      (document.getElementById(`${mainId}Top`) as HTMLElement).style.height = typeof topHeight === "number" ? `${topHeight}px` : topHeight;
      (document.getElementById(`${mainId}Bottom`) as HTMLElement).style.height = `calc(${
        100 - (typeof topHeight === "string" ? Number(topHeight.replace("%", "")) : 0)
      }% - ${(typeof topHeight === "number" ? topHeight : 0) + splitArea}px)`;
    }
    if (leftWidth !== prevProps.leftWidth && leftWidth && divisionDirection === "horizontal") {
      (document.getElementById(`${mainId}Left`) as HTMLElement).style.width = typeof leftWidth === "number" ? `${leftWidth}px` : leftWidth;
      (document.getElementById(`${mainId}Right`) as HTMLElement).style.width = `calc(${
        100 - (typeof leftWidth === "string" ? Number(leftWidth.replace("%", "")) : 0)
      }% - ${(typeof leftWidth === "number" ? leftWidth : 0) + splitArea}px)`;
    }
    if (topMinHeight && topMinHeight !== prevProps.topMinHeight && divisionDirection === "vertical") {
      (document.getElementById(`${mainId}Top`) as HTMLElement).style.minHeight = typeof topMinHeight === "number" ?
        `${topMinHeight}px` : topMinHeight;
    }
    if (topMinHeight && topMinHeight !== prevProps.topMinHeight && divisionDirection === "cross") {
      (document.getElementById(`${mainId}TopLeft`) as HTMLElement).style.minHeight = typeof topMinHeight === "number" ?
        `${topMinHeight}px` : topMinHeight;
      (document.getElementById(`${mainId}TopRight`) as HTMLElement).style.minHeight = typeof topMinHeight === "number" ?
        `${topMinHeight}px` : topMinHeight;
    }
    if (bottomMinHeight && bottomMinHeight !== prevProps.bottomMinHeight && divisionDirection === "vertical") {
      (document.getElementById(`${mainId}Bottom`) as HTMLElement).style.minHeight = typeof bottomMinHeight === "number" ?
        `${bottomMinHeight}px` : bottomMinHeight;
    }
    if (bottomMinHeight && bottomMinHeight !== prevProps.bottomMinHeight && divisionDirection === "cross") {
      (document.getElementById(`${mainId}BottomLeft`) as HTMLElement).style.minHeight = typeof bottomMinHeight === "number" ?
        `${bottomMinHeight}px` : bottomMinHeight;
      (document.getElementById(`${mainId}BottomRight`) as HTMLElement).style.minHeight = typeof bottomMinHeight === "number" ?
        `${bottomMinHeight}px` : bottomMinHeight;
    }
    if (leftMinWidth && leftMinWidth !== prevProps.leftMinWidth && divisionDirection === "horizontal") {
      (document.getElementById(`${mainId}Left`) as HTMLElement).style.minWidth = typeof leftMinWidth === "number" ?
        `${leftMinWidth}px` : leftMinWidth;
    }
    if (leftMinWidth && leftMinWidth !== prevProps.leftMinWidth && divisionDirection === "cross") {
      (document.getElementById(`${mainId}TopLeft`) as HTMLElement).style.minWidth = typeof leftMinWidth === "number" ?
        `${leftMinWidth}px` : leftMinWidth;
      (document.getElementById(`${mainId}BottomLeft`) as HTMLElement).style.minWidth = typeof leftMinWidth === "number" ?
        `${leftMinWidth}px` : leftMinWidth;
    }
    if (rightMinWidth && rightMinWidth !== prevProps.rightMinWidth && divisionDirection === "horizontal") {
      (document.getElementById(`${mainId}Right`) as HTMLElement).style.minWidth = typeof rightMinWidth === "number" ?
        `${rightMinWidth}px` : rightMinWidth;
    }
    if (rightMinWidth && rightMinWidth !== prevProps.rightMinWidth && divisionDirection === "cross") {
      (document.getElementById(`${mainId}TopRight`) as HTMLElement).style.minWidth = typeof rightMinWidth === "number" ?
        `${rightMinWidth}px` : rightMinWidth;
      (document.getElementById(`${mainId}BottomRight`) as HTMLElement).style.minWidth = typeof rightMinWidth === "number" ?
        `${rightMinWidth}px` : rightMinWidth;
    }
  }
  
  /** 分割线点击按下 */
  splitLineDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const { mainId } = this.state;
    const { divisionDirection } = this.props;
    if (divisionDirection === "vertical") {
      this.initPageY = event.pageY;
      this.initTopHeight = (document.getElementById(`${mainId}Top`) as HTMLElement).clientHeight;
    } else {
      this.initPageX = event.pageX;
      this.initLeftWidth = (document.getElementById(`${mainId}Left`) as HTMLElement).clientWidth;
    }
    // @ts-ignore
    document.addEventListener("mousemove", this.splitLineMove);
    // @ts-ignore
    document.addEventListener("mouseup", this.splitLineUp);
  }
  
  /** 分割线移动 */
  splitLineMove = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const {
      divisionDirection, splitArea, topMinHeight, bottomMinHeight, leftMinWidth, rightMinWidth,
    } = this.props;
    const { mainId } = this.state;
    if (divisionDirection === "vertical") {
      // 偏移量
      const offset = event.pageY - this.initPageY;
      const currentTopHeight = this.initTopHeight + offset;
  
      if (topMinHeight) {
        (document.getElementById(`${mainId}Top`) as HTMLElement).style.minHeight = typeof topMinHeight === "number" ?
          `${topMinHeight}px` : topMinHeight;
      }
      if (bottomMinHeight) {
        (document.getElementById(`${mainId}Bottom`) as HTMLElement).style.minHeight = typeof bottomMinHeight === "number" ?
          `${bottomMinHeight}px` : bottomMinHeight;
      }
      
      (document.getElementById(`${mainId}Top`) as HTMLElement).style.height = `${currentTopHeight}px`;
      (document.getElementById(`${mainId}Bottom`) as HTMLElement).style.height = `calc(100% - ${currentTopHeight + splitArea}px)`;
    } else {
      const offset = event.pageX - this.initPageX;
      const currentLeftWidth = this.initLeftWidth + offset;
  
      if (leftMinWidth) {
        (document.getElementById(`${mainId}Left`) as HTMLElement).style.minWidth = typeof leftMinWidth === "number" ?
          `${leftMinWidth}px` : leftMinWidth;
      }
      if (rightMinWidth) {
        (document.getElementById(`${mainId}Right`) as HTMLElement).style.minWidth = typeof rightMinWidth === "number" ?
          `${rightMinWidth}px` : rightMinWidth;
      }
      
      (document.getElementById(`${mainId}Left`) as HTMLElement).style.width = `${currentLeftWidth}px`;
      (document.getElementById(`${mainId}Right`) as HTMLElement).style.width = `calc(100% - ${currentLeftWidth + splitArea}px)`;
    }
  }
  
  /** 分割线点击离开 */
  splitLineUp = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const { divisionDirection } = this.props;
    if (divisionDirection === "vertical") {
      this.initPageY = 0;
      this.initTopHeight = 0;
    } else {
      this.initPageX = 0;
      this.initLeftWidth = 0;
    }
    // @ts-ignore
    document.removeEventListener("mousemove", this.splitLineMove);
    // @ts-ignore
    document.removeEventListener("mouseup", this.splitLineUp);
  }
  
  /** 渲染拖拽分割线 */
  renderSplitLine() {
    const { divisionDirection, disabled } = this.props;
    const { mainId } = this.state;
    return (
      <>
        {
          !disabled && (
            <div
              id={`${mainId}SplitLine`}
              className={`${divisionDirection === "vertical" ? "splitLineHorizontal" : "splitLineVertical"}`}
              onMouseDown={this.splitLineDown}
            >
              <div className="line"/>
            </div>
          )
        }
      </>
    );
  }
  
  /** 渲染十字交叉拖拽分割线十字线 */
  renderCrossLine() {
    const { disabled } = this.props;
    const { mainId } = this.state;
    return (
      <>
        {
          !disabled && (
            <div
              id={`${mainId}crossDragLine`}
              className="crossDragLine"
              onMouseDown={this.crossLineDown}
            />
          )
        }
      </>
    );
  }
  
  /** 十字线点击按下 */
  crossLineDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const { mainId } = this.state;
    
    this.initPageY = event.pageY;
    this.initTopHeight = (document.getElementById(`${mainId}TopLeft`) as HTMLElement).clientHeight;
    this.initPageX = event.pageX;
    this.initLeftWidth = (document.getElementById(`${mainId}TopLeft`) as HTMLElement).clientWidth;
    
    // @ts-ignore
    document.addEventListener("mousemove", this.crossLineMove);
    // @ts-ignore
    document.addEventListener("mouseup", this.crossLineUp);
  }
  
  /** 十字线移动 */
  crossLineMove = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const {
      topMinHeight, bottomMinHeight, leftMinWidth, rightMinWidth,
    } = this.props;
    const { mainId } = this.state;
    
    // 垂直偏移量
    const offsetY = event.pageY - this.initPageY;
    const currentTopHeight = this.initTopHeight + offsetY;
    // 水平偏移量
    const offsetX = event.pageX - this.initPageX;
    const currentLeftWidth = this.initLeftWidth + offsetX;
    
    const crossWrapWidth = (document.getElementById(`${mainId}DragDivisionWrap`) as HTMLElement).clientWidth;
    const crossWrapHeight = (document.getElementById(`${mainId}DragDivisionWrap`) as HTMLElement).clientHeight;
    
    const newOffsetXTemp = offsetX + this.crossCacheLeft;
    const newOffsetYTemp = offsetY + this.crossCacheTop;
  
    const leftMinWidthTemp = typeof leftMinWidth === "number"
      ? leftMinWidth
      : leftMinWidth ? (crossWrapWidth * parseFloat(leftMinWidth) / 100) : 0;
  
    const rightMinWidthTemp = typeof rightMinWidth === "number"
      ? rightMinWidth
      : rightMinWidth ? (crossWrapWidth * parseFloat(rightMinWidth) / 100) : 0;
  
    const topMinHeightTemp = typeof topMinHeight === "number"
      ? topMinHeight
      : topMinHeight ? (crossWrapWidth * parseFloat(topMinHeight) / 100) : 0;
  
    const bottomMinHeightTemp = typeof bottomMinHeight === "number"
      ? bottomMinHeight
      : bottomMinHeight ? (crossWrapWidth * parseFloat(bottomMinHeight) / 100) : 0;
    
    const crossWrapWidthTemp = crossWrapWidth - (leftMinWidthTemp + rightMinWidthTemp);
    const crossWrapHeightTemp = crossWrapHeight - (topMinHeightTemp + bottomMinHeightTemp);
    
    const newOffsetX = Math.abs(newOffsetXTemp) > (crossWrapWidthTemp / 2 - 12)
      ? (newOffsetXTemp < 0 ? -1 : 1) * (crossWrapWidthTemp / 2 - (newOffsetXTemp > 0 ? 16 : 12))
      : newOffsetXTemp;
    const newOffsetY = Math.abs(newOffsetYTemp) > (crossWrapHeightTemp / 2 - 12)
      ? (newOffsetYTemp < 0 ? -1 : 1) * (crossWrapHeightTemp / 2 + (newOffsetYTemp < 0 ? -12 : -16))
      : newOffsetYTemp;
    
    // 十字线的定位更新
    (document.getElementById(`${mainId}crossDragLine`) as HTMLElement).style.left = `calc(50% + ${newOffsetX}px)`;
    (document.getElementById(`${mainId}crossDragLine`) as HTMLElement).style.top = `calc(50% + ${newOffsetY}px)`;
    
    if (topMinHeight) {
      (document.getElementById(`${mainId}TopLeft`) as HTMLElement).style.minHeight = typeof topMinHeight === "number" ?
        `${topMinHeight}px` : topMinHeight;
      (document.getElementById(`${mainId}TopRight`) as HTMLElement).style.minHeight = typeof topMinHeight === "number" ?
        `${topMinHeight}px` : topMinHeight;
    }
    if (bottomMinHeight) {
      (document.getElementById(`${mainId}BottomLeft`) as HTMLElement).style.minHeight = typeof bottomMinHeight === "number" ?
        `${bottomMinHeight}px` : bottomMinHeight;
      (document.getElementById(`${mainId}BottomRight`) as HTMLElement).style.minHeight = typeof bottomMinHeight === "number" ?
        `${bottomMinHeight}px` : bottomMinHeight;
    }
    
    if (leftMinWidth) {
      (document.getElementById(`${mainId}TopLeft`) as HTMLElement).style.minWidth = typeof leftMinWidth === "number" ?
        `${leftMinWidth}px` : leftMinWidth;
      (document.getElementById(`${mainId}BottomLeft`) as HTMLElement).style.minWidth = typeof leftMinWidth === "number" ?
        `${leftMinWidth}px` : leftMinWidth;
    }
    if (rightMinWidth) {
      (document.getElementById(`${mainId}TopRight`) as HTMLElement).style.minWidth = typeof rightMinWidth === "number" ?
        `${rightMinWidth}px` : rightMinWidth;
      (document.getElementById(`${mainId}BottomRight`) as HTMLElement).style.minWidth = typeof rightMinWidth === "number" ?
        `${rightMinWidth}px` : rightMinWidth;
    }
    
    // 由于flex布局，这里flex-wrap换行后对于每个元素宽高的影响是相互的，导致最终的呈现状态不太好，这里需要最小值(中间的间隔8)加一来保证布局的稳定
    const currentTopHeightTemp = crossWrapHeightTemp && currentTopHeight
      ? currentTopHeight <= (8 + topMinHeightTemp)
        ? (8.1 + topMinHeightTemp)
        : currentTopHeight >= (crossWrapHeightTemp - 20 + topMinHeightTemp) ? (crossWrapHeightTemp - 20 + topMinHeightTemp) : currentTopHeight
      : currentTopHeight;
    
    const currentLeftWidthTemp = crossWrapWidthTemp && currentLeftWidth
      ? currentLeftWidth <= (8 + leftMinWidthTemp)
        ? (8.1 + leftMinWidthTemp)
        : currentLeftWidth >= (crossWrapWidthTemp - 20 + leftMinWidthTemp) ? (crossWrapWidthTemp - 20 + leftMinWidthTemp) : currentLeftWidth
      :
      currentLeftWidth;
    
    (document.getElementById(`${mainId}TopLeft`) as HTMLElement).style.height = `${currentTopHeightTemp}px`;
    (document.getElementById(`${mainId}TopRight`) as HTMLElement).style.height = `${currentTopHeightTemp}px`;
    (document.getElementById(`${mainId}BottomLeft`) as HTMLElement).style.height = `calc(100% - ${currentTopHeightTemp + 8}px)`;
    (document.getElementById(`${mainId}BottomRight`) as HTMLElement).style.height = `calc(100% - ${currentTopHeightTemp + 8}px)`;
    
    (document.getElementById(`${mainId}TopLeft`) as HTMLElement).style.width = `${currentLeftWidthTemp}px`;
    (document.getElementById(`${mainId}BottomLeft`) as HTMLElement).style.width = `${currentLeftWidthTemp}px`;
    (document.getElementById(`${mainId}TopRight`) as HTMLElement).style.width = `calc(100% - ${currentLeftWidthTemp + 8}px)`;
    (document.getElementById(`${mainId}BottomRight`) as HTMLElement).style.width = `calc(100% - ${currentLeftWidthTemp + 8}px)`;
  }
  
  /** 十字线离开 */
  crossLineUp = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const { mainId } = this.state;
    
    // 缓存记录十字线的定位，便于下一次点击拖拽计算定位
    const crossLineLeft = (document.getElementById(`${mainId}crossDragLine`) as HTMLElement).style.left;
    const crossLineTop = (document.getElementById(`${mainId}crossDragLine`) as HTMLElement).style.top;
    
    if (crossLineLeft) {
      const crossCacheLeftTemp = Number(crossLineLeft.substring(
        crossLineLeft.includes("-") ?  crossLineLeft.indexOf("-") + 1 : crossLineLeft.indexOf("+") + 2,
        crossLineLeft.indexOf("px)"),
      ));
      this.crossCacheLeft = crossLineLeft.includes("-") ? -crossCacheLeftTemp : crossCacheLeftTemp;
    }
    if (crossLineTop) {
      const crossCacheTopTemp = Number(crossLineTop.substring(
        crossLineTop.includes("-") ?  crossLineTop.indexOf("-") + 1 : crossLineTop.indexOf("+") + 2,
        crossLineTop.indexOf("px)"),
      ));
      this.crossCacheTop = crossLineTop.includes("-") ? -crossCacheTopTemp : crossCacheTopTemp;
    }
    
    this.initPageY = 0;
    this.initTopHeight = 0;
    this.initPageX = 0;
    this.initLeftWidth = 0;
    
    // @ts-ignore
    document.removeEventListener("mousemove", this.crossLineMove);
    // @ts-ignore
    document.removeEventListener("mouseup", this.crossLineUp);
  }
  
  render() {
    const {
      className, style, divisionDirection, topNode, bottomNode, leftNode, rightNode, crossItemStyle,
      splitArea, topHeight, leftWidth, topLeftNode, topRightNode, bottomLeftNode, bottomRightNode,
    } = this.props;
    const { mainId } = this.state;
    return (
      <DragDivisionWrap
        id={`${mainId}DragDivisionWrap`}
        className={`${className} ${divisionDirection === "cross" ? "crossWrap" : ""}`}
        style={style}
        divisionDirection={divisionDirection}
        splitArea={splitArea}
        topHeight={topHeight || `calc(50% - ${splitArea / 2}px)`}
        leftWidth={leftWidth || `calc(50% - ${splitArea / 2}px)`}
      >
        {
          divisionDirection === "vertical" && (
            <>
              <div id={`${mainId}Top`} className="top">{topNode}</div>
              {this.renderSplitLine()}
              <div id={`${mainId}Bottom`} className="bottom">{bottomNode}</div>
            </>
          )
        }
        {
          divisionDirection === "horizontal" && (
            <>
              <div id={`${mainId}Left`} className="left">{leftNode}</div>
              {this.renderSplitLine()}
              <div id={`${mainId}Right`} className="right">{rightNode}</div>
            </>
          )
        }
        {
          divisionDirection === "cross" && (
            <>
              <div style={crossItemStyle} id={`${mainId}TopLeft`} className="crossItem topLeft">{topLeftNode}</div>
              <div style={crossItemStyle} id={`${mainId}TopRight`} className="crossItem topRight">{topRightNode}</div>
              <div style={crossItemStyle} id={`${mainId}BottomLeft`} className="crossItem bottomLeft">{ bottomLeftNode}</div>
              <div style={crossItemStyle} id={`${mainId}BottomRight`} className="crossItem bottomRight">{bottomRightNode}</div>
              {/** 放在后面渲染十字线，为了去除绝对定位对于flex布局的影响 */}
              {this.renderCrossLine()}
            </>
          )
        }
      </DragDivisionWrap>
    );
  }
}
