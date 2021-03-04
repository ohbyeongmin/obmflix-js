/* eslint-disable react-hooks/exhaustive-deps */
import { moviesApi, tvApi } from "api";
import Loader from "Component/Loader";
import Poster from "Component/Poster";
import Section from "Component/Section";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

const Container = styled.div`
	padding: 20px;
	margin-top: 50px;
`;

export default ({ match }) => {
	const [movieResults, setMovieResults] = useState(null);
	const [tvResults, setTVResults] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const {
		params: { searchTerm },
	} = match;

	const getSearchApi = async function () {
		try {
			const {
				data: { results: movieResults },
			} = await moviesApi.search(searchTerm);
			const {
				data: { results: tvResults },
			} = await tvApi.search(searchTerm);
			setMovieResults(movieResults);
			setTVResults(tvResults);
		} catch {
			setError("can't find results");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getSearchApi();
	}, [searchTerm]);

	return (
		<>
			<Helmet>
				<title> Search| Nomflix</title>
			</Helmet>
			{loading ? (
				<Loader />
			) : (
				<>
					<Container>
						{movieResults && movieResults.length > 0 && (
							<Section title="Movie Results">
								{movieResults.map((movie) => (
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
						{tvResults && tvResults.length > 0 && (
							<Section title="TV Show Results">
								{tvResults.map((show) => (
									<Poster
										key={show.id}
										id={show.id}
										title={show.original_name}
										imageUrl={show.poster_path}
										rating={show.vote_average}
										year={
											show.first_air_date && show.first_air_date.substring(0, 4)
										}
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
