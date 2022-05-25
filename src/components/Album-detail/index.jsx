import React from "react";
import { TopDesc, Menu } from "./style";
import SongsList from "../../application/SongList/";

function AlbumDetail(props) {
	const { currentAlbum, pullUpLoading } = props;

	const renderTopDesc = () => {
		return (
			<TopDesc background={currentAlbum.coverImgUrl}>
				<div className="background">
					<div className="filter"></div>
				</div>
				<div className="img_wrapper">
					<div className="=decorate"></div>
					<img src={currentAlbum.coverImgUrl} alt="" />
					<div className="play_count">
						<i className="iconfont play">&#xe885;</i>
						<span className="count">
							{Math.floor(currentAlbum.playCount / 1000) / 10}万
						</span>
					</div>
				</div>
				<div className="desc_wrapper">
					<div className="title">{currentAlbum.name}</div>
					<div className="person">
						<img src={currentAlbum.creator.avatarUrl} alt="" />
						<div className="name">{currentAlbum.creator.nickname}</div>
					</div>
				</div>
			</TopDesc>
		);
	};

	const renderMenu = () => {
		return (
			<Menu>
				<div>
					<i className="iconfont">&#xe6ad;</i>
					评论
				</div>
				<div>
					<i className="iconfont">&#xe86f;</i>
					点赞
				</div>
				<div>
					<i className="iconfont">&#xe62d;</i>
					收藏
				</div>
				<div>
					<i className="iconfont">&#xe606;</i>
					更多
				</div>
			</Menu>
		);
	};

	const renderSonglist = () => {
		return (
			<SongsList
				songs={currentAlbum.tracks}
				songsCount={currentAlbum.trackCount}
				collectCount={currentAlbum.subscribedCount}
				showCollect={true}
				showBackground={true}
			></SongsList>
		);
	};

	return (
		<div>
			{renderTopDesc()}
			{renderMenu()}
			{renderSonglist()}
		</div>
	);
}

export default React.memo(AlbumDetail);
