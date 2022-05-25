import React, { useEffect } from "react";
import { forceCheck } from "react-lazyload";
import { connect, useSelector, useDispatch } from "react-redux";
import { renderRoutes } from "react-router-config";

import { EnterLoading } from "../Singers/style";
import Slider from "../../components/Slider/";
import * as actionTypes from "./store/actionCreators";
import RecommendList from "../../components/List/";
import Scroll from "../../baseUI/scroll/index";
import { Content } from "./style";
import Loading from "../../baseUI/loading";

function Recommend(props) {
	const { bannerList, recommendList, enterLoading } = props;

	const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

	useEffect(() => {
		if (!bannerList.size) {
			getBannerDataDispatch();
		}
		if (!recommendList.size) {
			getRecommendListDataDispatch();
		}
	}, []);

	const bannerListJS = bannerList ? bannerList.toJS() : [];
	const recommendListJS = recommendList ? recommendList.toJS() : [];

	return (
		<Content>
			<Scroll className="list" onScroll={forceCheck}>
				<div>
					<Slider bannerList={bannerListJS}></Slider>
					<RecommendList recommendList={recommendListJS}></RecommendList>
				</div>
			</Scroll>
			{enterLoading ? (
				<EnterLoading>
					<Loading></Loading>
				</EnterLoading>
			) : null}
			{renderRoutes(props.route.routes)}
		</Content>
	);
}
// export default React.memo(Recommend)
// 映射 Redux 全局的 state 到组件的 props 上

const mapStateToProps = (state) => ({
	// 不能在这里将数据 toJS
	// 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
	bannerList: state.getIn(["recommend", "bannerList"]),
	recommendList: state.getIn(["recommend", "recommendList"]),
	enterLoading: state.getIn(["recommend", "enterLoaidng"]),
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
	return {
		getBannerDataDispatch() {
			return dispatch(actionTypes.getBannerList());
		},
		getRecommendListDataDispatch() {
			return dispatch(actionTypes.getRecommendList());
		},
	};
};

// 将 ui 组件包装成容器组件
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(React.memo(Recommend));
