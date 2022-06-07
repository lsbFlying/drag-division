import styled from "styled-components";
import { DivisionDirection } from "../interface";

interface Props {
  /** 垂直方向分割的子元素高度(可以是百分比或者数字像素值，禁止calc)（默认对半分） */
  topHeight: number | string;
  /** 水平方向分割的子元素宽度(可以是百分比或者数字像素值，禁止calc)（默认对半分） */
  leftWidth: number | string;
  /** 分割方向(默认垂直方向分割) */
  divisionDirection: DivisionDirection;
  /** 分割线所在区域的高度/宽度(默认10px) */
  splitArea: number;
}

export const DragDivisionWrap = styled.div<Props>`
  position: relative;
  width: 100%;
  height: 100%;
	display: flex;
	 flex-direction: ${p => p.divisionDirection === "vertical" ? "column" : "row"};
	justify-content: space-between;
	align-items: center;
	.top, .bottom {
		width: 100%;
    overflow: hidden;
	}
	.top {
		height: ${p => typeof p.topHeight === "number" ? `${p.topHeight}px` : `calc(${p.topHeight} - ${p.splitArea / 2}px)`};
	}
  .bottom {
    height: ${p => `calc(${100 - (typeof p.topHeight === "string" ? Number(p.topHeight.replace("%", "")) : 0)}% - ${(typeof p.topHeight === "number" ? p.topHeight : 0) + p.splitArea / 2}px)`};
  }
  .left, .right {
    height: 100%;
    overflow: hidden;
  }
  .left {
    width: ${p => typeof p.leftWidth === "number" ? `${p.leftWidth}px` : `calc(${p.leftWidth} - ${p.splitArea / 2}px)`};
  }
  .right {
    width: ${p => `calc(${100 - (typeof p.leftWidth === "string" ? Number(p.leftWidth.replace("%", "")) : 0)}% - ${(typeof p.leftWidth === "number" ? p.leftWidth : 0) + p.splitArea / 2}px)`};
  }
	.splitLineHorizontal {
		width: 100%;
    height: ${p => `${p.splitArea}px`};
		position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
		cursor: row-resize;
		.line {
      width: 100%;
      height: 1px;
      background-color: #cccfd7;
      transform: scaleY(.5);
		}
		&:before {
			content: "";
			position: absolute;
      top: 1.5px;
      left: 0;
      width: 100%;
      height: 1px;
      border-top: 1px #cccfd7 dotted;
      border-left: none;
      transform: scaleY(.5);
		}
    &:after {
      content: "";
      position: absolute;
	    bottom: 1.5px;
	    left: 0;
      right: unset;
      width: 100%;
      height: 1px;
      border-bottom: 1px #cccfd7 dotted;
      border-right: none;
      transform: scaleY(.5);
    }
	}
	.splitLineVertical {
		width: ${p => `${p.splitArea}px`};
    height: 100%;
		position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
		cursor: col-resize;
		.line {
      width: 1px;
      height: 100%;
      background-color: #cccfd7;
      transform: scaleX(.5);
		}
		&:before {
			content: "";
			position: absolute;
      top: 0;
      left: 1.5px;
      width: 1px;
      height: 100%;
      border-top: none;
      border-left: 1px #cccfd7 dotted;
      transform: scaleX(.5);
		}
    &:after {
      content: "";
      position: absolute;
      top: 0;
	    left: unset;
      right: 1.5px;
      width: 1px;
      height: 100%;
      border-bottom: none;
      border-right: 1px #cccfd7 dotted;
      transform: scaleX(.5);
    }
	}
	&.crossWrap {
		flex-wrap: wrap;
    .crossItem {
      width: calc(50% - 4px);
      height: calc(50% - 4px);
      &:first-child, &:nth-child(2) {
        margin-bottom: 8px;
      }
    }
		.crossDragLine {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 24px;
			height: 24px;
			background-color: transparent;
      cursor: move;
			&:before {
				content: "";
				width: 100%;
				height: 1px;
				background-color: #a9b3bc;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: 0;
			}
      &:after {
        content: "";
        width: 1px;
        height: 100%;
        background-color: #a9b3bc;
        position: absolute;
        top: 0;
        transform: translateX(-50%);
        left: 50%;
      }
		}
	}
`;
