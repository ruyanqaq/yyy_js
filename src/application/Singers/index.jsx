import React, { useState, useRef, useEffect } from "react";
import Horizen from "../../baseUI/horizen-item";
import { categoryTypes, alphaTypes } from "../../api/config";
import {
	NavContainer,
	ListContainer,
	List,
	ListItem,
	EnterLoading,
} from "./style";
import {
	getSingerList,
	getHotSingerList,
	changeListOffset,
	changeAlpha,
	changeCategory,
	refreshMoreSingerList,
	changePullUpLoading,
	changePullDownLoading,
	refreshMoreHotSingerList,
} from "./store/actionCreators";
import Scroll from "./../../baseUI/scroll/index";
import { connect } from "react-redux";
import LazyLoad, { forceCheck } from "react-lazyload";
import Loading from "./../../baseUI/loading";
import { renderRoutes } from "react-router-config";

function Singers(props) {
	const scrollRef = useRef(null);

	const {
		alpha,
		category,
		pageCount,
		singerList,
		pullDownLoading,
		pullUpLoading,
		enterLoading,
	} = props;
	const {
		getHotSingerDispatch,
		updateCategoryDispatch,
		updateAlphaDispatch,
		pullUpRefreshDispatch,
		pullDownRefreshDispatch,
	} = props;

	const handleUpdateCategory = (newVal) => {
		if (category === newVal) return;
		updateCategoryDispatch(newVal);
		scrollRef.current.refresh();
	};

	const handleUpdateAlpha = (newVal) => {
		if (alpha === newVal) return;
		updateAlphaDispatch(newVal);
		scrollRef.current.refresh();
	};

	const handlePullUp = () => {
		pullUpRefreshDispatch(category === "", pageCount);
	};

	const handlePullDown = () => {
		pullDownRefreshDispatch(category, alpha);
	};

	const enterDetail = (id) => {
		props.history.push(`/singers/${id}`);
	};

	useEffect(() => {
		if (!singerList.length && !category && !alpha) {
			getHotSingerDispatch();
			console.log(singerList);
		}
	}, []);

	const renderSingerList = () => {
		const { singerList } = props;
		return (
			<List>
				{singerList.toJS().map((item, index) => {
					return (
						<ListItem
							key={item.accountId + "" + index}
							onClick={() => enterDetail(item.id)}
						>
							<div className="img_wrapper">
								<LazyLoad
									placeholder={
										<img
											width="100%"
											height="100%"
											src={require("./singer.png")}
											alt="music"
										/>
									}
								>
									<img
										src={`${item.picUrl}?param=300x300`}
										width="100%"
										height="100%"
										alt="music"
									/>
								</LazyLoad>
							</div>
							<div className="singerContent">
								<span className="name">{item.name}</span>
								<span className="like">
									&nbsp;&nbsp;+&nbsp;关注&nbsp;&nbsp;
								</span>
							</div>
						</ListItem>
					);
				})}
			</List>
		);
	};

	return (
		<div>
			<NavContainer>
				<Horizen
					list={categoryTypes}
					oldVal={category}
					handleClick={(v) => handleUpdateCategory(v)}
					title={"分类 (默认热门):"}
				/>
				<Horizen
					list={alphaTypes}
					oldVal={alpha}
					handleClick={(v) => handleUpdateAlpha(v)}
					title={"首字母:"}
				/>
			</NavContainer>

			<ListContainer>
				<Scroll
					pullUp={handlePullUp}
					pullDown={handlePullDown}
					pullUpLoading={pullUpLoading}
					pullDownLoading={pullDownLoading}
					onScroll={forceCheck}
					ref={scrollRef}
				>
					{renderSingerList()}
				</Scroll>
			</ListContainer>
			{enterLoading ? (
				<EnterLoading>
					<Loading></Loading>
				</EnterLoading>
			) : null}
			{renderRoutes(props.route.routes)}
		</div>
	);
}

const mapStateToProps = (state) => ({
	alpha: state.getIn(["singers", "alpha"]),
	category: state.getIn(["singers", "category"]),
	singerList: state.getIn(["singers", "singerList"]),
	enterLoading: state.getIn(["singers", "enterLoading"]),
	pullUpLoading: state.getIn(["singers", "pullUpLoading"]),
	pullDownLoading: state.getIn(["singers", "pullDownLoading"]),
	pageCount: state.getIn(["singers", "pageCount"]),
});

const mapDispatchToProps = (dispatch) => {
	return {
		getHotSingerDispatch() {
			dispatch(getHotSingerList());
		},
		updateCategoryDispatch(newVal) {
			dispatch(changeCategory(newVal));
			dispatch(getSingerList());
		},
		updateAlphaDispatch(newVal) {
			dispatch(changeAlpha(newVal));
			dispatch(getSingerList());
		},
		//底部上拉加载新数据
		pullUpRefreshDispatch(hot, count) {
			dispatch(changePullUpLoading(true));
			if (hot) {
				dispatch(refreshMoreHotSingerList());
			} else {
				dispatch(refreshMoreSingerList());
			}
		},
		//顶部下拉刷新
		pullDownRefreshDispatch(category, alpha) {
			dispatch(changePullDownLoading(true));
			dispatch(changeListOffset(0));
			if (category === "" && alpha === "") {
				dispatch(getHotSingerList());
			} else {
				dispatch(getSingerList());
			}
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(React.memo(Singers));
