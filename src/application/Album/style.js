import style from "../../assets/global-style";
import styled from "styled-components";

export const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 60px;
	z-index: 1000;
	background: ${style["background-color"]};
	transform-origin: right bottom;
	&.fly-enter,
	&.fly-appear {
		transform: rotateZ(30deg) translate3d(100%, 0, 0);
	}
	&.fly-enter-active,
	&.fly-appear-active {
		transition: transform 0.3s;
		transform: rotateZ(0deg) translate3d (0, 0, 0);
	}
	&.fly-enter-done,
	&.fly-active-done {
	}
	&.fly-exit {
		transform: rotateZ(0deg) translate3d (0, 0, 0);
	}
	&.fly-exit-active {
		transition: transform 0.3s;
		transform: rotateZ(30deg) translate3d (100%, 0, 0);
	}
`;
