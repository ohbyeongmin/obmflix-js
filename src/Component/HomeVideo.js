import React, { useEffect, useState } from "react";
import styled from "styled-components";

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

export default () => {
	const [muted, setMuted] = useState(true);
	const [volume, setVolume] = useState("fas fa-volume-up");
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

	const setMuteInitial = () => {
		setTimeout(setMuted(false), 1000);
	};

	useEffect(() => setMuteInitial(), []);

	return (
		<VideoContainer>
			<Video src="limDarkSoul.mp4" autoPlay type="video/mp4" muted={muted} />
			<VideoBtn
				onMouseDown={handleVolumeClick}
				onMouseUp={() => setToggle(false)}
				toggle={toggle}
				loop
			>
				<i className={volume}></i>
			</VideoBtn>
		</VideoContainer>
	);
};
