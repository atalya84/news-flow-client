import PropTypes from 'prop-types';
import { StyledtodayPanel } from './Today.styles';

const Today = ({ current, unitsLabels }) => {
	const labels = { wind: 'Wind', humidity: 'Humidity' };
	return (
		<StyledtodayPanel className="rw-today">
			<div className="rw-today-date">{current?.date}</div>
			<div className="rw-today-hr" />
			<div className="rw-today-current">
				{current?.temperature} {unitsLabels.temperature}
			</div>
			<div className="rw-today-desc">{current?.description}</div>
			<div className="rw-today-hr" />
			<div className="rw-today-info">
				<div>
					{labels.wind}: <b>{current?.wind}</b> {unitsLabels.windSpeed}
				</div>
				<div>
					{labels.humidity}: <b>{current?.humidity}</b> %
				</div>
			</div>
		</StyledtodayPanel>
	);
};

Today.propTypes = {
	current: PropTypes.object,
	unitsLabels: PropTypes.object.isRequired,
};

export default Today;