import { Redirect } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import Home from "../application/Home";
const RecommendComponent = lazy(() => import("../application/Recommend/"));
const SingersComponent = lazy(() => import("../application/Singers/"));
const RankComponent = lazy(() => import("../application/Rank/"));
const AlbumComponent = lazy(() => import("../application/Album/"));
const SingerComponent = lazy(() => import("./../application/Singer/"));

const SuspenseComponent = (Component) => (props) => {
	return (
		<Suspense fallback={null}>
			<Component {...props}></Component>
		</Suspense>
	);
};

export default [
	{
		path: "/",
		component: Home,
		routes: [
			{
				path: "/",
				exact: true,
				render: () => <Redirect to={"/recommend"} />,
			},
			{
				path: "/recommend",
				component: SuspenseComponent(RecommendComponent),
				key: "Recommend",
				routes: [
					{
						path: "/recommend/:id",
						component: SuspenseComponent(AlbumComponent),
					},
				],
			},
			{
				path: "/singers",
				component: SuspenseComponent(SingersComponent),
				key: "singers",
				routes: [
					{
						path: "/singers/:id",
						component: SuspenseComponent(SingerComponent),
					},
				],
			},
			{
				path: "/rank",
				component: SuspenseComponent(RankComponent),
				key: "rank",
				routes: [
					{
						path: "/rank/:id",
						component: SuspenseComponent(AlbumComponent),
					},
				],
			},
		],
	},
];
