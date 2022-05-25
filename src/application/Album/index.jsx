import React, { useState, useCallback, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import Header from "../../baseUI/header";
import Scroll from "../../baseUI/scroll";
import { EnterLoading } from "./../Singers/style";
import { Container } from "./style";
import { isEmptyObject } from "../../api/utils";
import style from "../../assets/global-style";
import { HEADER_HEIGHT } from "./../../api/config";
import {
	getAlbumList,
	changeEnterLoading,
	changePullUpLoading,
} from "./store/actionCreater";
import Loading from "../../baseUI/loading";
import AlbumDetail from "../../components/Album-detail/index";

function Album(props) {
	const [showStatus, setShowStatus] = useState(true);
	const [title, setTitle] = useState("歌单");
	const [isMarquee, setIsMarquee] = useState(false); //控制标题跑马灯

	const handleEl = useRef();

	const handleBack = useCallback(() => {
		setShowStatus(false);
	}, []);

	const id = props.match.params.id;

	const {
		currentAlbum: currentAlbumImmutable,
		enterLoading,
		pullUpLoading,
	} = props;
	const { getAlbumDataDispatch, changePullUpLoadingStateDispatch } = props;

	useEffect(() => {
		getAlbumDataDispatch(id);
	}, [getAlbumDataDispatch, id]);

	// 同时将 mock 数据的代码删除
	let currentAlbum = currentAlbumImmutable.toJS();

	const handleScroll = useCallback(
		(pos) => {
			let minScrollY = -HEADER_HEIGHT;
			let percent = Math.abs(pos.y / minScrollY);
			let headerDom = handleEl.current;
			// 滑过顶部的高度开始变化
			if (pos.y < minScrollY) {
				headerDom.style.backgroundColor = style["theme-color"];
				headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
				setTitle(currentAlbum.name);
				setIsMarquee(true);
			} else {
				headerDom.style.backgroundColor = "";
				headerDom.style.opacity = 1;
				setTitle("歌单");
				setIsMarquee(false);
			}
		},
		[currentAlbum]
	);

	const handlePullUp = () => {
		changePullUpLoadingStateDispatch(true);
		changePullUpLoadingStateDispatch(false);
	};

	return (
		<CSSTransition
			in={showStatus}
			timeout={300}
			classNames="fly"
			appear={true}
			unmountOnExit
			onExited={props.history.goBack}
		>
			<Container>
				{enterLoading ? (
					<EnterLoading>
						<Loading></Loading>
					</EnterLoading>
				) : null}
				<Header
					ref={handleEl}
					title={title}
					isMarquee={isMarquee}
					handleClick={handleBack}
				></Header>
				{!isEmptyObject(currentAlbum) ? (
					<Scroll
						bounceTop={false}
						onScroll={handleScroll}
						pullUp={handlePullUp}
						pullUpLoading={pullUpLoading}
					>
						<AlbumDetail
							currentAlbum={currentAlbum}
							pullUpLoading={pullUpLoading}
						></AlbumDetail>
					</Scroll>
				) : null}
			</Container>
		</CSSTransition>
	);
}

const mapStateToProps = (state) => ({
	currentAlbum: state.getIn(["album", "currentAlbum"]),
	enterLoading: state.getIn(["album", "enterLoading"]),
	enterLoading: state.getIn(["album", "enterLoading"]),
	startIndex: state.getIn(["album", "startIndex"]),
	totalCount: state.getIn(["album", "totalCount"]),
});
const mapDispatchToProps = (dispatch) => {
	return {
		getAlbumDataDispatch(id) {
			dispatch(changeEnterLoading(false));
			dispatch(getAlbumList(id));
		},
		changePullUpLoadingStateDispatch(state) {
			dispatch(changePullUpLoading(state));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));
