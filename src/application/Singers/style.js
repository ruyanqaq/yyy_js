import styled from "styled-components";
import style from "../../assets/global-style";

export const NavContainer = styled.div`
	box-sizing: border-box;
	position: fixed;
	overflow: hidden;
	width: 100%;
	top: 95px;
	padding: 5px;
`;

export const ListContainer = styled.div`
	position: fixed;
	top: 160px;
	left: 0;
	bottom: 0;
	overflow: hidden;
	width: 100%;
`;
export const List = styled.div`
	display: flex;
	margin: auto;
	flex-direction: column;
	overflow: hidden;
	.title {
		margin: 10px 0 10px 10px;
		color: ${style["font-color-desc"]};
		font-size: ${style["font-size-s"]};
	}
`;
export const ListItem = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	margin: 0 5px;
	padding: 5px 0;
	align-items: center;

	.singerContent {
		box-sizing: border-box;
		height: 50px;
		width: 100%;
		border-bottom: 1px solid ${style["border-color"]};
		.name {
			line-height: 50px;
			font-size: ${style["font-size-m"]};
			color: ${style["font-color-desc"]};
			font-weight: 500;
		}
		.like {
			margin-top: 15px;
			line-height: 20px;
			float: right;
			font-size: ${style["font-size-s"]};
			color: ${style["theme-color"]};
			border: 1px solid ${style["theme-color"]};
			border-radius: 10px;
		}
	}

	.img_wrapper {
		margin-right: 20px;
		img {
			border-radius: 50%;
			width: 50px;
			height: 50px;
		}
	}
`;

export const EnterLoading = styled.div`
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	width: 100px;
	height: 100px;
	margin: auto;
`;
