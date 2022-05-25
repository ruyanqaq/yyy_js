import React, {
	forwardRef,
	useState,
	useEffect,
	useRef,
	useImperativeHandle,
	useMemo,
} from "react";
import PropTypes from "prop-types";
import BScroll from "better-scroll";
import styled from "styled-components";
import Loading from "../loading";
import Loading_v2 from "../loading-v2";
import { debounce } from "../../api/utils";

const ScrollContainer = styled.div`
	width: 100%;
	height: 100%;
	overflow: hidden;
`;

const PullUpLoading = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	bottom: 5px;
	width: 60px;
	height: 60px;
	margin: auto;
	z-index: 100;
`;

const PullDownLoading = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	top: 0px;
	height: 30px;
	margin: auto;
	z-index: 100;
`;

const Scroll = forwardRef((props, ref) => {
	//better-scroll实例对象
	const [bScroll, setBScroll] = useState();
	//current 指向初始化bs实例需要的DOM元素
	const scrollContainerRef = useRef();

	const {
		direction,
		click,
		refresh,
		pullUpLoading,
		pullDownLoading,
		bounceTop,
		bounceBottom,
		pullUp,
		pullDown,
		onScroll,
	} = props;

	let pullUpDebounce = useMemo(() => {
		return debounce(pullUp, 500);
	}, [pullUp]);

	let pullDownDebounce = useMemo(() => {
		return debounce(pullDown, 500);
	}, [pullDown]);

	//初始化better-scroll
	useEffect(() => {
		const scroll = new BScroll(scrollContainerRef.current, {
			scrollX: direction === "horizental",
			scrollY: direction === "vertical",
			probeType: 3,
			click: click,
			bounce: {
				top: bounceTop,
				bottom: bounceBottom,
			},
		});
		setBScroll(scroll);

		//类似于componentWillUnmount，组件渲染和组件卸载前执⾏的代码
		return () => {
			setBScroll(null);
		};
		// eslint-disable-next-line
	}, []);

	//每次重新渲染时刷新实例，避免无法滑动
	useEffect(() => {
		if (refresh && bScroll) {
			bScroll.refresh();
		}
	});

	//绑定事件
	useEffect(() => {
		if (!bScroll || !pullUp) return;
		bScroll.on("scroll", (scroll) => {
			onScroll(scroll);
		});
		return () => {
			bScroll.off("scroll");
		};
	}, [onScroll, bScroll]);

	useEffect(() => {
		if (!bScroll || !onScroll) return;
		bScroll.on("scroll", onScroll);
		return () => {
			bScroll.off("scroll", onScroll);
		};
	}, [onScroll, bScroll]);

	//上拉到底时，调用上拉刷新
	useEffect(() => {
		if (!bScroll || !pullUp) return;
		const handlepullUp = () => {
			//判断是否滑动到底部
			if (bScroll.y <= bScroll.maxScrollY + 100) {
				pullUpDebounce();
			}
		};
		bScroll.on("scrollEnd", handlepullUp);
		//解绑
		return () => {
			bScroll.off("scrollEnd", handlepullUp);
		};
	}, [pullUp, pullUpDebounce, bScroll]);

	//下拉到顶时，调用下拉刷新
	useEffect(() => {
		if (!bScroll || !pullDown) return;
		const handlepullDown = (pos) => {
			// 判断用户的下拉动作
			if (pos.y > 50) {
				pullDown();
			}
		};
		bScroll.on("touchEnd", handlepullDown);
		//解绑
		return () => {
			bScroll.off("touchEnd", handlepullDown);
		};
	}, [pullDown, pullDownDebounce, bScroll]);

	//暴露方法给外界调用
	useImperativeHandle(ref, () => ({
		refresh() {
			if (bScroll) {
				bScroll.refresh();
				bScroll.scrollTo(0, 0);
			}
		},

		getBScrol() {
			if (bScroll) {
				return bScroll;
			}
		},
	}));

	const PullUpdisplayStyle = pullUpLoading
		? { display: "" }
		: { display: "none" };
	const PullDowndisplayStyle = pullDownLoading
		? { display: "" }
		: { display: "none" };

	return (
		<ScrollContainer ref={scrollContainerRef}>
			{props.children}
			{/* 滑到底部加载动画 */}
			<PullUpLoading style={PullUpdisplayStyle}>
				<Loading></Loading>
			</PullUpLoading>
			{/* 顶部下拉刷新动画 */}
			<PullDownLoading style={PullDowndisplayStyle}>
				<Loading_v2></Loading_v2>
			</PullDownLoading>
		</ScrollContainer>
	);
});

Scroll.defaultProps = {
	direction: "vertical", //竖直方向
	click: true, //点击
	refresh: true, //刷新
	onScroll: null, //回调函数
	pullUpLoading: false, //上拉显示loading
	pullDownLoading: false, //下拉显示loading
	pullUp: null, //上拉加载
	pullDown: null, //下拉加载
	bounceTop: true, //向上吸顶
	bounceBottom: true, //向下吸顶
};

Scroll.propTypes = {
	direction: PropTypes.oneOf(["vertical", "horizental"]),
	refresh: PropTypes.bool,
	onScroll: PropTypes.func,
	pullUp: PropTypes.func,
	pullDown: PropTypes.func,
	pullUpLoading: PropTypes.bool,
	pullDownLoading: PropTypes.bool,
	bounceTop: PropTypes.bool,
	bounceBottom: PropTypes.bool,
};

export default Scroll;
