import { axiosInstance } from "./config";

export const getBannerRequest = () => {
	//轮播图
	return axiosInstance.get("/banner");
};

export const getRecommendListRequest = () => {
	//推荐歌单
	return axiosInstance.get("/personalized");
};

export const getHotSingerListRequest = (count) => {
	//热门歌手
	return axiosInstance.get(`/top/artists?offset=${count}`);
};

export const getSingerListRequest = (type, area, alpha, count) => {
	//歌手列表
	return axiosInstance.get(
		`/artist/list?type=${type}&area=${area}&initial=${alpha.toLowerCase()}&offset=${count}`
	);
};

export const getRankListRequest = () => {
	//排行榜
	return axiosInstance.get(`/toplist/detail`);
};

export const getAlbumDetailRequest = (id) => {
	//歌单详情
	return axiosInstance.get(`/playlist/detail?id=${id}`);
};

export const getAlbumAllSongsRequest = (id) => {
	//歌单全部歌曲
	return axiosInstance.get(`/playlist/track/all?id=${id}`);
};

export const getSingerInfoRequest = (id) => {
	//歌手详情
	return axiosInstance.get(`/artists?id=${id}`);
};
