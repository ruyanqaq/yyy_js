import * as actionTypes from "./constants";
import { fromJS } from "immutable";

const defaultState = fromJS({
	bannerList: [],
	recommendList: [],
	enterLoading: true,
});

export default (prestate = defaultState, action) => {
	switch (action.type) {
		case actionTypes.CHANGE_BANNER:
			return prestate.set("bannerList", action.data);
		case actionTypes.CHANGE_RECOMMEND_LIST:
			return prestate.set("recommendList", action.data);
		case actionTypes.CHANGE_ENTER_LOADING:
			return prestate.set("enterLoading", action.data);
		default:
			return prestate;
	}
};
