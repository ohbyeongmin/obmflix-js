import { moviesApi, tvApi } from "api";
import Loader from "Component/Loader";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
	margin-top: 55px;
	height: calc(100vh - 55px);
	width: 100%;
	padding: 20px;
	position: relative;
`;

const Backdrop = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	background-image: url(${(props) => props.bgImage});
	width: 100%;
	height: 100%;
	background-position: center center;
	background-size: cover;
	filter: blur(3px);
	opacity: 0.5;
	z-index: 0;
`;

const Content = styled.div`
	display: flex;
	width: 100%;
	position: relative;
	z-index: 1;
	height: 100%;
`;

const Cover = styled.div`
	width: 40vw;
	height: 55vw;
	background-image: url(${(props) => props.bgImage});
	background-position: center center;
	background-size: cover;
	border-radius: 5px;
`;

const Data = styled.div`
	width: 70%;
	margin-left: 10px;
`;

const Title = styled.h3`
	font-size: 32px;
	margin-bottom: 10px;
`;

const ItemContainer = styled.div`
	margin: 20px 0px;
`;

const Item = styled.span``;

const Divider = styled.span`
	margin: 0 10px;
`;

const Overviews = styled.div`
	font-size: 12px;
	opacity: 0.7;
	line-height: 1.5;
	width: 50%;
`;

export default (props) => {
	const {
		match: {
			params: { id },
		},
		history: { push },
		location: { pathname },
	} = props;
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [detail, setDetail] = useState(null);
	const parseId = parseInt(id);
	const isMovie = pathname.includes("/movie/");

	if (isNaN(parseId)) {
		push("/");
	}

	const getDetailApi = async () => {
		try {
			if (isMovie) {
				const { data } = await moviesApi.movieDetail(parseId);
				setDetail(data);
			} else {
				const { data } = await tvApi.showDetail(parseId);
				setDetail(data);
			}
		} catch {
			setError(`Can't find Detail`);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getDetailApi();
	}, []);

	return loading ? (
		<Loader />
	) : (
		<>
			{" "}
			<Helmet>
				<title>
					{detail.original_title ? detail.original_title : detail.original_name}{" "}
					| OBMFLIX
				</title>
			</Helmet>
			<Container>
				<Backdrop
					bgImage={`https://image.tmdb.org/t/p/original${detail.backdrop_path}`}
				/>
				<Content>
					<Cover
						bgImage={
							detail.poster_path
								? `https://image.tmdb.org/t/p/original${detail.poster_path}`
								: "/noPosterSmall.png"
						}
					/>
					<Data>
						<Title>
							{detail.original_title
								? detail.original_title
								: detail.original_name}
						</Title>
						<ItemContainer>
							<Item>
								{detail.release_date
									? detail.release_date.substring(0, 4)
									: detail.first_air_date.substring(0, 4)}
							</Item>
							<Divider>•</Divider>
							<Item>
								{detail.runtime
									? `${detail.runtime} min`
									: `${detail.episode_run_time[0]} min`}
							</Item>
							<Divider>•</Divider>
							<Item>
								{detail.genres &&
									detail.genres.map((genre, index) =>
										index === detail.genres.length - 1
											? genre.name
											: `${genre.name} / `
									)}
							</Item>
						</ItemContainer>
						<Overviews>{detail.overview}</Overviews>
					</Data>
				</Content>
			</Container>
		</>
	);
};
