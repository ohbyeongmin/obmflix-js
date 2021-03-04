import React from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
	font-size: 50px;
	width: 100%;
	display: flex;
	justify-content: center;
	margin-top: 200px;
`;

const LoadAnimation = keyframes`
	0% {
		transfrom: rotate(0deg);
	}
	100%{
		transform: rotate(360deg);
	}
`;

const LoaderBox = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	border: solid 5px transparent;
	border-top: solid 5px #e50916;
	animation: ${LoadAnimation} 0.5s infinite linear;
`;

export default () => (
	<Container>
		<LoaderBox></LoaderBox>
	</Container>
);
