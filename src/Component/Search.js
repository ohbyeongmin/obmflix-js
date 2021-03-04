import React, { useRef, useState } from "react";
import { Route } from "react-router";
import Search from "Route/Search";
import styled from "styled-components";

const SearchContaner = styled.div`
	position: relative;
	width: 200px;
	height: 30px;
	padding-top: 3px;
`;

const SearchIcon = styled.div`
	position: absolute;
	right: ${(props) => (props.open ? "212px" : "12px")};
	cursor: pointer;
	transition: ease right 1s 50ms;
	top: 8px;
`;

const SearchBox = styled.input`
	height: 25px;
	outline: none;
	background: rgba(0, 0, 0, 0.85);
	border: solid 1px rgba(255, 255, 255, 0.85);
	color: white;
	width: ${(props) => (props.open ? "100%" : "0%")};
	opacity: ${(props) => (props.open ? "1" : "0")};
	transition: ease width 1s, ease opacity 1s;
	float: right;
`;

export default ({ history, match }) => {
	const [openSearchBar, setOpenSearchBar] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const focusSearch = useRef();
	const openHandler = (event) => {
		setOpenSearchBar(!openSearchBar);
		focusSearch.current.focus();
	};

	const updateTerm = (event) => {
		const {
			target: { value },
		} = event;
		setSearchTerm(value);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		history.push(`/search/${searchTerm}`);
	};

	return (
		<>
			<SearchContaner>
				<SearchIcon open={openSearchBar} onClick={openHandler}>
					<span>
						<i className="fas fa-search"></i>
					</span>
				</SearchIcon>
				<form onSubmit={submitHandler}>
					<SearchBox
						placeholder="Search Movie or TV Shows..."
						open={openSearchBar}
						value={searchTerm}
						onChange={updateTerm}
						ref={focusSearch}
						onBlur={() => {
							setOpenSearchBar(false);
						}}
					></SearchBox>
				</form>
			</SearchContaner>
		</>
	);
};
