import React, { useState, useRef, useEffect, memo } from "react";
import styled from "styled-components";
import Scroll from "../scroll/index";
import { PropTypes } from "prop-types";
import style from "../../assets/global-style";

const List = styled.div`
	display: flex;
	align-items: center;
	height: 30px;
	overflow: hidden;
	> span:first-of-type {
		display: block;
		flex: 0 0 auto;
		padding: 5px 0;
		margin-right: 5px;
		color: grey;
		font-size: ${style["font-size-m"]};
		align-items: center;
	}
`;

const ListItem = styled.span`
	flex: 0 0 auto;
	font-size: ${style["font-size-m"]};
	padding: 5px 8px;
	border-radius: 10px;
	&.selected {
		color: ${style["theme-color"]};
		border: 1px solid ${style["theme-color"]};
		opacity: 0.8;
	}
`;

function Horizen(props) {
	const { list, oldVal, title } = props;
	const { handleClick } = props;

	const Category = useRef(null);

	useEffect(() => {
		let cateGoryDOM = Category.current;
		let tagElems = cateGoryDOM.querySelectorAll("span");
		let totalWidth = 0;
		Array.from(tagElems).forEach((item) => {
			totalWidth += item.offsetWidth;
		});
		cateGoryDOM.style.width = `${totalWidth}px`;
	});

	const clickHandle = (item) => {
		handleClick(item.key);
	};

	return (
		<Scroll direction={"horizental"}>
			<div ref={Category}>
				<List>
					<span>{title}</span>
					{list.map((item) => {
						return (
							<ListItem
								key={item.key}
								className={oldVal === item.key ? "selected" : ""}
								onClick={() => clickHandle(item)}
							>
								{item.name}
							</ListItem>
						);
					})}
				</List>
			</div>
		</Scroll>
	);
}

Horizen.defaultProps = {
	list: [],
	oldVal: "",
	title: "",
	handleClick: null,
};

Horizen.propTypes = {
	list: PropTypes.array, //行内元素
	oldVal: PropTypes.string, //选中元素
	title: PropTypes.string,
	handleClick: PropTypes.func,
};

export default React.memo(Horizen);
