import styled from "styled-components";
import style from "../../assets/global-style";

export const SliderContainer = styled.div`
	box-sizing: border-box;
	position: relative;
	width: 100%;
	height: 100%;
	margin: auto;

	.before {
		top: 0;
		position: absolute;
		width: 100%;
		height: 60%;
		background: ${style["theme-color"]};
	}
	.slider-container {
		position: relative;
		width: 98%;
		height: 130px;
		overflow: hidden;
		border-radius: 6px;
		margin: auto;
	}
	.slider-nav {
		position: absolute;
		display: block;
		width: 100%;
		height: 100%;
	}
`;
