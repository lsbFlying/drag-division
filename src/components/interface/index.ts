import React from "react";

/** 样式props */
export interface ICSSProps {
	/** html id name */
	id?: string;
	/** html class name */
	className?: React.HTMLAttributes<HTMLDivElement>['className'];
	/** 样式 */
	style?: React.CSSProperties;
}

export interface BasicProps {}

export interface Basic<P extends BasicProps = BasicProps, S = {}, SS = any>
	extends React.PureComponent<P, S, SS> {}

/**
 * css接口，命名为ICSS是为了避免与系统重名
 * @interface ICSS
 * @extends {Basic<T, S, SS>}
 * @template T
 * @template S
 * @template SS
 */
export interface ICSS<T extends ICSSProps = ICSSProps, S = {}, SS = any>
	extends Basic<T, S, SS> {}

export type DivisionDirection = "vertical" | "horizontal" | "cross";

export type DragDivisionProps = ICSSProps & {
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

export interface DragDivisionState {
	/** id */
	mainId: string;
}
