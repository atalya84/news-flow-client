import PropTypes from 'prop-types';
import Today from './Today';
import WeatherIcon from './WeatherIcon';
import { StyledContainer } from './ReactWeather.styles';
import { useState } from 'react';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { Close, EditLocationAlt, Search } from '@mui/icons-material';
import { weatherInput } from './styles';

const ReactWeather = ({
	unitsLabels,
	data,
	locationLabel,
	isLoading,
	errorMessage,
	setLocation,
}) => {
	const current = data?.current;
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (errorMessage) {
		return <div>{errorMessage}</div>;
	}

	const [edit, setEdit] = useState<boolean>(false);
	const [searchText, setSearchText] = useState<string>(locationLabel);
	const [label, setLabel] = useState<string>(locationLabel);

	return (
		<StyledContainer>
			<div className="rw-container-main">
				<div className="rw-container-left">
					<Box display="flex" alignItems="start">
						{edit ? (
							<>
								<TextField
									sx={weatherInput}
									variant="standard"
									value={searchText}
									onChange={(e) => setSearchText(e.target.value)}
								/>
								<IconButton
									sx={{ color: 'white' }}
									onClick={() => {
										if (searchText !== '') {
											setLabel(searchText);
											setLocation(searchText);
										}
										setEdit(false);
									}}
								>
									<Search fontSize="small" />
								</IconButton>
								<IconButton
									sx={{ color: 'white' }}
									onClick={() => {
										setEdit(false);
										setSearchText(label);
									}}
								>
									<Close fontSize="small" />
								</IconButton>
							</>
						) : (
							<>
								<Typography variant={'h2'} className="rw-container-header">
									{label}
								</Typography>
								<IconButton
									sx={{ color: 'white' }}
									onClick={() => setEdit(true)}
								>
									<EditLocationAlt fontSize="small" />
								</IconButton>
							</>
						)}
					</Box>
					<Today current={current} unitsLabels={unitsLabels} />
				</div>
				<div className="rw-container-right">
					<WeatherIcon
						path={current?.icon}
						size={120}
						color={'#FFF'}
						title={current?.description}
					/>
				</div>
			</div>
		</StyledContainer>
	);
};

ReactWeather.propTypes = {
	data: PropTypes.object,
	isLoading: PropTypes.bool,
	errorMessage: PropTypes.string,
	unitsLabels: PropTypes.object,
	locationLabel: PropTypes.string,
};

export default ReactWeather;