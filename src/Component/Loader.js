import React from "react";
import styled, { keyframes } from "styled-components";

const LoadingAnimation = keyframes`
    13% {
        transform: translateY(-20px);
        color: #E50916;
    }
    25% {
        transform: translateY(0px);
    }
    100% {
        transform: translateY(0px);
    }
`;

const Container = styled.div`
	font-size: 50px;
	width: 100%;
	display: flex;
	justify-content: center;
	margin-top: 200px;
`;

const Loading = styled.div`
	width: auto;
	margin-left: 20px;
	&:nth-child(1) {
		animation: ${LoadingAnimation} 2s infinite linear;
	}
	&:nth-child(2) {
		animation: ${LoadingAnimation} 2s 0.1s infinite linear;
	}
	&:nth-child(3) {
		animation: ${LoadingAnimation} 2s 0.2s infinite linear;
	}
	&:nth-child(4) {
		animation: ${LoadingAnimation} 2s 0.3s infinite linear;
	}
	&:nth-child(5) {
		animation: ${LoadingAnimation} 2s 0.4s infinite linear;
	}
	&:nth-child(6) {
		animation: ${LoadingAnimation} 2s 0.5s infinite linear;
	}
	&:nth-child(7) {
		animation: ${LoadingAnimation} 2s 0.6s infinite linear;
	}
	&:nth-child(8) {
		animation: ${LoadingAnimation} 2s 0.7s infinite linear;
	}
	&:nth-child(9) {
		animation: ${LoadingAnimation} 2s 0.8s infinite linear;
	}
	&:nth-child(10) {
		animation: ${LoadingAnimation} 2s 0.9s infinite linear;
	}
`;

export default () => (
	<Container>
		<Loading>L</Loading>
		<Loading>O</Loading>
		<Loading>A</Loading>
		<Loading>D</Loading>
		<Loading>I</Loading>
		<Loading>N</Loading>
		<Loading>G</Loading>
		<Loading>.</Loading>
		<Loading>.</Loading>
		<Loading>.</Loading>
	</Container>
);
