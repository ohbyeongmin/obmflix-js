import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const VideoContainer = styled.div`
	position: relative;
`;

const Video = styled.video`
	width: 100%;
	opacity: 0.5;
`;

const VideoBtn = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	border: solid 1px white;
	width: 40px;
	height: 40px;
	font-size: 15px;
	top: 65%;
	right: 5%;
	&:hover {
		cursor: pointer;
	}
	background-color: ${(props) =>
		props.toggle ? "rgb(255,255,255,0.5)" : "transparent"};
`;

const LogoAnimation = keyframes`
	0%{
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
`;

const VideoLogo = styled.img`
	position: absolute;
	top: 85%;
	left: 3%;
	width: 45vw;
	background-size: cover;
	opacity: 0;
	animation: ${LogoAnimation} 2s 3.5s linear;
	animation-fill-mode: forwards;
`;

export default () => {
	const [muted, setMuted] = useState(true);
	const [volume, setVolume] = useState("fas fa-volume-mute");
	const [toggle, setToggle] = useState(false);

	const handleVolumeClick = (e) => {
		if (muted) {
			setMuted(false);
			setVolume("fas fa-volume-up");
		} else {
			setMuted(true);
			setVolume("fas fa-volume-mute");
		}
		setToggle(true);
	};

	// const setMuteInitial = () => {
	// 	setTimeout(setMuted(false), 1000);
	// };

	// useEffect(() => setMuteInitial(), []);

	return (
		<VideoContainer>
			<Video src="limDarkSoul.mp4" autoPlay type="video/mp4" muted={muted} />
			<VideoLogo src="darkSoulLogo.png" alt="logo" />
			<VideoBtn
				onMouseDown={handleVolumeClick}
				onMouseUp={() => setToggle(false)}
				toggle={toggle}
				loop
				onCh
			>
				<i className={volume}></i>
			</VideoBtn>
		</VideoContainer>
	);
};
