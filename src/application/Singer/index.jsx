import React, { useEffect, useRef, useState, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import {
	Container,
	ImgWrapper,
	CollectButton,
	SongListWrapper,
	BgLayer,
} from "./style";
import Header from "../../baseUI/header/index";
import Scroll from "../../baseUI/scroll/index";
import { HEADER_HEIGHT } from "./../../api/config";
import SongsList from "../SongList/";
import { connect } from "react-redux";
import Loading from "./../../baseUI/loading/index";
import { EnterLoading } from "../Singers/style";
import { getSingerInfo, changeEnterLoading } from "./store/actionCreators";

function Singer(props) {
	const [showStatus, setShowStatus] = useState(true);

	const { artist: immutableArtist, songs: immutableSongs, loading } = props;

	const { getSingerDataDispatch } = props;

	const artist = immutableArtist.toJS();
	const songs = immutableSongs.toJS();

	const collectButton = useRef(); //收藏按钮
	const imageWrapper = useRef(); //歌手照片墙
	const songScrollWrapper = useRef();
	const songScroll = useRef();
	const header = useRef();
	const layer = useRef();
	const initialHeight = useRef(0); // 图片初始高度
	const musicNoteRef = useRef();

	const OFFSET = 5; //偏移尺寸

	useEffect(() => {
		console.log(props);
		const id = props.match.params.id;
		getSingerDataDispatch(id);
		let h = imageWrapper.current.offsetHeight;
		songScrollWrapper.current.style.top = `${h - OFFSET}px`;
		initialHeight.current = h;
		layer.current.style.top = `${h - OFFSET}px`;
		songScroll.current.refresh();
	}, []);

	const setShowStatusFalse = useCallback(() => {
		setShowStatus(false);
	}, []);

	const handleScroll = (pos) => {
		let height = initialHeight.current;
		const newY = pos.y;
		const imageDOM = imageWrapper.current;
		const buttonDOM = collectButton.current;
		const headerDOM = header.current;
		const layerDOM = layer.current;
		const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;
		const percent = Math.abs(newY / height); // 滑动距离占图片高度的百分比

		if (newY > 0) {
			//处理往下拉的情况,效果：图片放大，按钮跟着偏移
			imageDOM.style["transform"] = `scale(${1 + percent})`;
			buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
			layerDOM.style.top = `${height - OFFSET + newY}px`; //遮罩做空白背景
		} else if (newY >= minScrollY) {
			//往上滑动，未超过Header
			layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;
			layerDOM.style.zIndex = 1;
			imageDOM.style.paddingTop = "75%";
			imageDOM.style.height = 0;
			imageDOM.style.zIndex = -1;
			buttonDOM.style["transform"] = `translate3d(0,${newY}px,0)`;
			buttonDOM.style["transform"] = `${1 - percent * 2}`;
		} else if (newY < minScrollY) {
			//往上滑动，超过Header
			layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
			layerDOM.style.zIndex = 1;
			//防止溢出的歌单内容遮住Header
			headerDOM.style.zIndex = 100;
			//此时图片高度与Header一致
			imageDOM.style.height = `${HEADER_HEIGHT}px`;
			imageDOM.style.paddingTop = 0;
			imageDOM.style.zIndex = 99;
		}
	};

	return (
		<CSSTransition
			in={showStatus}
			timeout={300}
			classNames="fly"
			appear={true}
			unmountOnExit
			onExit={() => props.history.goBack()}
		>
			<Container>
				<Header
					handleClick={setShowStatusFalse}
					title={artist.name}
					ref={header}
				></Header>
				<ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
					<div className="filter"></div>
				</ImgWrapper>
				<CollectButton ref={collectButton}>
					<i className="iconfont">&#xe62d;</i>
					<span className="text"> 收藏 </span>
				</CollectButton>

				<BgLayer ref={layer}></BgLayer>

				<SongListWrapper ref={songScrollWrapper}>
					<Scroll ref={songScroll} onScroll={handleScroll}>
						<SongsList songs={songs} showCollect={false}></SongsList>
					</Scroll>
				</SongListWrapper>
				{loading ? (
					<EnterLoading style={{ zIndex: 100 }}>
						<Loading></Loading>
					</EnterLoading>
				) : null}
			</Container>
		</CSSTransition>
	);
}

const mapStateToProps = (state) => ({
	artist: state.getIn(["singerInfo", "artist"]),
	songs: state.getIn(["singerInfo", "songsOfArtist"]),
	loading: state.getIn(["singerInfo", "loading"]),
});

const mapDispatchToProps = (dispatch) => {
	return {
		getSingerDataDispatch(id) {
			dispatch(changeEnterLoading(true));
			dispatch(getSingerInfo(id));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singer));
