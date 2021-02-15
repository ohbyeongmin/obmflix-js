import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
	:not(:last-child) {
		margin-bottom: 50px;
	}
`;

const Title = styled.span`
	font-size: 14px;
	font-weight: 600;
`;

const Grid = styled.div`
	margin-top: 25px;
	display: grid;
	grid-auto-flow: column;
	grid-gap: 25px;
	overflow: scroll;
`;

const Section = ({ title, children }) => {
	return (
		<Container>
			<Title>{title}</Title>
			<Grid>{children}</Grid>
		</Container>
	);
};

Section.proTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};

export default Section;