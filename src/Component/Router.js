import React from "react";
import {
	HashRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";
import Header from "Component/Header";
import Home from "Route/Home";
import TV from "Route/TV";
import Search from "Route/Search";
import HomeVideo from "./HomeVideo";
import Detail from "Route/Detail";

export default () => (
	<Router>
		<>
			<Header />
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/tv" exact component={TV} />
				<Route path="/search/:searchTerm" exact component={Search} />
				<Route path="/movie/:id" component={Detail} />
				<Route path="/tv/:id" exact component={Detail} />
				<Redirect from="*" to="/" />
			</Switch>
		</>
	</Router>
);
