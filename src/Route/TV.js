import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { tvApi } from "api";
import Loader from "Component/Loader";
import Section from "Component/Section";
import Poster from "Component/Poster";

const Container = styled.div`
	padding: 20px;
	margin-top: 50px;
`;

export default () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [topRated, setTopRated] = useState(null);
	const [popular, setPopular] = useState(null);
	const [airingToday, setAiringToday] = useState(null);

	const getTVApi = async () => {
		try {
			const {
				data: { results: topRated },
			} = await tvApi.topRated();
			const {
				data: { results: popular },
			} = await tvApi.popular();
			const {
				data: { results: airingToday },
			} = await tvApi.airingToday();
			setTopRated(topRated);
			setPopular(popular);
			setAiringToday(airingToday);
		} catch {
			setError("Can't find TV information");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getTVApi();
	}, []);

	return loading ? (
		<Loader />
	) : (
		<>
			<Container>
				{topRated && topRated.length > 0 && (
					<Section title="TV 프로그램 순위">
						{topRated.map((tv) => (
							<Poster
								key={tv.id}
								id={tv.id}
								title={tv.original_name}
								imageUrl={tv.poster_path}
								rating={tv.vote_average}
								year={tv.first_air_date && tv.first_air_date.substring(0, 4)}
							/>
						))}
					</Section>
				)}
				{popular && popular.length > 0 && (
					<Section title="인기 TV 프로그램">
						{popular.map((tv) => (
							<Poster
								key={tv.id}
								id={tv.id}
								title={tv.original_name}
								imageUrl={tv.poster_path}
								rating={tv.vote_average}
								year={tv.first_air_date && tv.first_air_date.substring(0, 4)}
							/>
						))}
					</Section>
				)}
				{airingToday && airingToday.length > 0 && (
					<Section title="현재 방영중">
						{airingToday.map((tv) => (
							<Poster
								key={tv.id}
								id={tv.id}
								title={tv.original_name}
								imageUrl={tv.poster_path}
								rating={tv.vote_average}
								year={tv.first_air_date && tv.first_air_date.substring(0, 4)}
							/>
						))}
					</Section>
				)}
			</Container>
		</>
	);
};
