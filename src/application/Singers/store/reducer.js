//reducer.js
import { fromJS } from "immutable";
import * as actionTypes from "./constants"

const defaultState = fromJS({
	category: "",
	alpha: "",
	singerList: [],
	enterLoading: true, //控制进场Loading
	pullUpLoading: false, //控制上拉加载动画
	pullDownLoading: false, //控制下拉加载动画
	listOffset: 0, //俺偏移量请求
});

export default (state = defaultState, action) => {
	switch (action.type) {
		case actionTypes.CHANGE_ALPHA:
			return state.merge({
				'alpha': action.data,
				listOffset: 0,
				enterLoading: true
			});
		case actionTypes.CHANGE_CATOGORY:
			return state.merge({
				'category': action.data,
				listOffset: 0,
				enterLoading: true
			});
		case actionTypes.CHANGE_SINGER_LIST:
			return state.set("singerList", action.data);
		case actionTypes.CHANGE_LIST_OFFSET:
			return state.set('listOffset', action.data);
		case actionTypes.CHANGE_ENTER_LOADING:
			return state.set("enterLoading", action.data);
		case actionTypes.CHANGE_PULLUP_LOADING:
			return state.set("pullUpLoading", action.data);
		case actionTypes.CHANGE_PULLDOWN_LOADING:
			return state.set("pullDownLoading", action.data);
		default:
			return state;
	}
};
