import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import Search from "./Search";

const Header = styled.div`
	width: 100%;
	height: 70px;
	font-size: 15px;
	position: fixed;
	top: 0px;
	left: 0px;
	background-color: ${(props) =>
		props.scrollOnTop ? "transparent" : "rgb(20,20,20)"};
	transition: background-color 0.4s ease-in-out;
	z-index: 10;
`;
const Lists = styled.ul`
	display: flex;
	align-items: center;
	width: 100%;
	height: 70px;
	padding: 0px 50px;
`;
const Item = styled.li`
	text-align: center;
	&:not(:first-child) {
		margin-left: 35px;
		opacity: ${(props) => (props.current ? 1 : 0.5)};
		font-weight: ${(props) => (props.current ? 600 : 400)};
	}
	&:last-child {
		opacity: 1;
		margin-left: auto;
	}
`;
const SLink = styled(Link)``;
const Logo = styled.img`
	background-size: cover;
	width: 100px;
`;

export default withRouter(({ location: { pathname }, history, match }) => {
	const [scrollOnTop, setScrollOnTop] = useState(true);

	const scrollHandler = () => {
		const scrollTop = document.documentElement.scrollTop;
		if (scrollTop > 0) {
			setScrollOnTop(false);
		} else {
			setScrollOnTop(true);
		}
	};
	useEffect(() => {
		window.addEventListener("scroll", scrollHandler);
		return () => {
			window.removeEventListener("scroll", scrollHandler);
		};
	}, []);

	return (
		<Header scrollOnTop={scrollOnTop}>
			<Lists>
				<Item current={pathname === "/"}>
					<SLink to="/">
						<Logo src="logo.png" alt="logo" />
					</SLink>
				</Item>
				<Item current={pathname === "/"}>
					<SLink to="/">영화</SLink>
				</Item>
				<Item current={pathname === "/tv"}>
					<SLink to="/tv">TV 프로그램</SLink>
				</Item>
				<Item current={pathname === "/search"}>
					<Search history={history} match={match}></Search>
				</Item>
			</Lists>
		</Header>
	);
});
