import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Chip,
	Divider,
	Link,
	Typography,
} from '@mui/material';
import { FC } from 'react';
import './styles.ts';
import { cardBoxStyle, cardContentStyle, cardStyle, headlineStyle, linkStyle } from './styles.ts';
import {Comment, Share} from '@mui/icons-material'
import { IconButton } from '../IconButton/IconButton.tsx';

const FeedItem: FC = () => {

	return (
		<>
			<Card sx={cardStyle}>
				<Box sx={cardBoxStyle}>
					<Box sx={cardContentStyle}>
						<Typography component="div" variant="h6" sx={headlineStyle}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in mauris turpis. Nam porttitor urna et odio finibus aliquet. Nullam sed egestas diam. Donec maximus, dolor interdum porttitor dapibus, mauris augue lobortis urna, id finibus nibh risus id neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae tortor et dui tincidunt malesuada lacinia vel quam.
						</Typography>
						<Chip label="Israel" variant='filled' size='small' sx={{color: 'white', backgroundColor: "#555555"}}/>
					</Box>
					<Link href="https://www.reddit.com/r/worldnews/" target="_blank" rel="noopener" sx={linkStyle}>https://www.reddit.com/r/worldnews/</Link>
					<Box sx={{ display: 'flex', justifyContent: 'flex-start'}}>
						<IconButton icon={<Comment />} label={42} />
						<IconButton icon={<Share />} label={'Share'} />
					</Box>
				</Box>
				<CardMedia
					component="img"
					sx={{ width: 150, height: 150, borderRadius: '1rem' }}
					image="./live-from-space.jpg"
					alt="Live from space album cover"
				/>
			</Card>
			<Divider sx={{ backgroundColor: '#555555' }} />
		</>
	);
};

export default FeedItem