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

export default () => (
	<Router>
		<>
			<Header />
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/tv" component={TV} />
				<Route path="/search/:searchTerm" exact component={Search} />
				<Redirect from="*" to="/" />
			</Switch>
		</>
	</Router>
);
