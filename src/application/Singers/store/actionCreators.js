import {
	CHANGE_SINGER_LIST,
	CHANGE_CATOGORY,
	CHANGE_ALPHA,
	CHANGE_LIST_OFFSET,
	CHANGE_PULLUP_LOADING,
	CHANGE_PULLDOWN_LOADING,
	CHANGE_ENTER_LOADING,
} from "./constants";
import { fromJS } from "immutable"; // 将 JS 对象转换成 immutable 对象
import {
	getSingerListRequest,
	getHotSingerListRequest,
} from "../../../api/request";
import { categoryMap } from "../../../api/config";

export const changeAlpha = (data) => ({
	type: CHANGE_ALPHA,
	data,
});

export const changeCategory = (data) => ({
	type: CHANGE_CATOGORY,
	data,
});

export const changeSingerList = (data) => ({
	type: CHANGE_SINGER_LIST,
	data: fromJS(data),
});

export const changeListOffset = (data) => ({
	type: CHANGE_LIST_OFFSET,
	data,
});

//进场loading
export const changeEnterLoading = (data) => ({
	type: CHANGE_ENTER_LOADING,
	data,
});

//滑动最底部loading
export const changePullUpLoading = (data) => ({
	type: CHANGE_PULLUP_LOADING,
	data,
});

//顶部下拉刷新loading
export const changePullDownLoading = (data) => ({
	type: CHANGE_PULLDOWN_LOADING,
	data,
});

//第一次加载热门歌手
export const getHotSingerList = () => {
	return (dispatch) => {
		getHotSingerListRequest(0)
			.then((res) => {
				const data = res.artists;
				dispatch(changeSingerList(data));
				dispatch(changeEnterLoading(false));
				dispatch(changePullDownLoading(false));
				dispatch(changeListOffset(data.length));
			})
			.catch(() => {
				console.log("热门歌手数据获取失败");
			});
	};
};

//加载更多热门歌手
export const refreshMoreHotSingerList = () => {
	return (dispatch, getState) => {
		const offset = getState().getIn(["singers", "listOffset"]);
		const singerList = getState().getIn(["singers", "singerList"]).toJS();
		getHotSingerListRequest(offset)
			.then((res) => {
				const data = [...singerList, ...res.artists];
				dispatch(changeSingerList(data));
				dispatch(changePullUpLoading(false));
				dispatch(changeListOffset(data.length));
			})
			.catch(() => {
				console.log("热门歌手数据获取失败");
			});
	};
};

//第一次加载对应类别的歌手
export const getSingerList = () => {
	return (dispatch, getState) => {
		const offset = getState().getIn(["singers", "listOffset"]);
		const category = getState().getIn(["singers", "category"]);
		const alpha = getState().getIn(["singers", "alpha"]);
		const singerCha = categoryMap.get(category);
		getSingerListRequest(singerCha.type, singerCha.area,alpha, offset)
			.then((res) => {
				const data = res.artists;
				dispatch(changeSingerList(data));
				dispatch(changeEnterLoading(false));
				dispatch(changePullDownLoading(false));
				dispatch(changeListOffset(data.length));
			})
			.catch(() => {
				console.log("歌手数据获取失败");
			});
	};
};

//加载更多歌手
export const refreshMoreSingerList = () => {
	return (dispatch, getState) => {
		const category = getState().getIn(["singers", "category"]);
		const alpha = getState().getIn(["singers", "alpha"]);
		const offset = getState().getIn(["singers", "listOffset"]);
		const singerList = getState().getIn(["singers", "singerList"]).toJS();
		getSingerListRequest(category, alpha, offset)
			.then((res) => {
				const data = [...singerList, ...res.artists];
				dispatch(changeSingerList(data));
				dispatch(changePullUpLoading(false));
				dispatch(changeListOffset(data.length));
			})
			.catch(() => {
				console.log("歌手数据获取失败");
			});
	};
};
