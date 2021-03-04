import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeVideo from "Component/HomeVideo";
import { Helmet } from "react-helmet";
import { moviesApi } from "api";
import Loader from "Component/Loader";
import Section from "Component/Section";
import Poster from "Component/Poster";

const Container = styled.div`
	padding: 20px;
`;

export default () => {
	const [nowPlaying, setNowPlaying] = useState(null);
	const [upcoming, setUpcoming] = useState(null);
	const [popular, setPopular] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	const getMovieApi = async () => {
		try {
			const {
				data: { results: nowPlaying },
			} = await moviesApi.nowPlaying();
			const {
				data: { results: upcoming },
			} = await moviesApi.upcoming();
			const {
				data: { results: popular },
			} = await moviesApi.popular();
			setNowPlaying(nowPlaying);
			setUpcoming(upcoming);
			setPopular(popular);
		} catch {
			setError("Can't find movie information");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getMovieApi();
	}, []);

	return (
		<>
			<Helmet>
				<title>Home | Obmflix</title>
			</Helmet>
			{loading ? (
				<Loader />
			) : (
				<>
					<HomeVideo />
					<Container>
						{nowPlaying && nowPlaying.length > 0 && (
							<Section title="현재 상영중">
								{nowPlaying.map((movie) => (
									<Poster
										key={movie.id}
										id={movie.id}
										title={movie.original_title}
										imageUrl={movie.poster_path}
										rating={movie.vote_average}
										year={
											movie.release_date && movie.release_date.substring(0, 4)
										}
										isMovie={true}
									/>
								))}
							</Section>
						)}
						{upcoming && upcoming.length > 0 && (
							<Section title="곧 출시 될 영화">
								{upcoming.map((movie) => (
									<Poster
										key={movie.id}
										id={movie.id}
										title={movie.original_title}
										imageUrl={movie.poster_path}
										rating={movie.vote_average}
										year={
											movie.release_date && movie.release_date.substring(0, 4)
										}
										isMovie={true}
									/>
								))}
							</Section>
						)}
						{popular && popular.length > 0 && (
							<Section title="인기 영화">
								{popular.map((movie) => (
									<Poster
										key={movie.id}
										id={movie.id}
										title={movie.original_title}
										imageUrl={movie.poster_path}
										rating={movie.vote_average}
										year={
											movie.release_date && movie.release_date.substring(0, 4)
										}
										isMovie={true}
									/>
								))}
							</Section>
						)}
					</Container>
				</>
			)}
		</>
	);
};
