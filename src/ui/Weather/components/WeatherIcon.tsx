import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const StyledSVG = styled.svg`
	fill: ${({ color }) => color};
`;

const WeatherIcon = ({
	title,
	path,
	size = 40,
	viewBox = '0 -5 35 40',
	color = '#4BC4F7',
}) => {
	return (
		<StyledSVG
			color={color}
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox={viewBox}
		>
			<title>{title}</title>
			<path d={path} />
		</StyledSVG>
	);
};

WeatherIcon.propTypes = {
	path: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	viewBox: PropTypes.string,
	color: PropTypes.string,
	size: PropTypes.number,
};

export default WeatherIcon;