import { Delete, Edit } from '@mui/icons-material';
import {
	ClickAwayListener,
	Grow,
	ListItemIcon,
	ListItemText,
	MenuItem,
	MenuList,
	Paper,
	Popper,
} from '@mui/material';
import { Dispatch, FC, SetStateAction } from 'react';
import { useNavigate } from 'react-router';
import { IPost } from '../../types/feed.types';
import { deletePost } from '../../services/posts.service';

export const PostMenu: FC<{
	anchorRef: any;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	handleDeletePost: (postId: string) => void;
	post?: IPost;
}> = ({
	anchorRef,
	open,
	setOpen,
	handleDeletePost,
	post,
}: {
	anchorRef: any;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	handleDeletePost: (postId: string) => void;
	post?: IPost;
}) => {
	const navigate = useNavigate();

	const handleClose = (event: Event | React.SyntheticEvent) => {
		if (
			anchorRef.current &&
			anchorRef.current.contains(event.target as HTMLElement)
		) {
			return;
		}

		setOpen(false);
	};

	return (
		<Popper
			open={open}
			anchorEl={anchorRef.current}
			role={undefined}
			placement="bottom-start"
			transition
			disablePortal
		>
			{({ TransitionProps, placement }) => (
				<Grow
					{...TransitionProps}
					style={{
						transformOrigin:
							placement === 'bottom-start' ? 'left top' : 'left bottom',
					}}
				>
					<Paper>
						<ClickAwayListener onClickAway={handleClose}>
							<MenuList
								autoFocusItem={open}
								id="composition-menu"
								aria-labelledby="composition-button"
							>
								<MenuItem
									onClick={(e) => {
										handleClose(e);
										navigate('/posts/submit', { state: { post } });
									}}
								>
									<ListItemIcon>
										<Edit />
									</ListItemIcon>
									<ListItemText>Edit</ListItemText>
								</MenuItem>
								<MenuItem
									onClick={(e) => {
										handleDeletePost(post!._id);
										handleClose(e);
									}}
								>
									<ListItemIcon>
										<Delete />
									</ListItemIcon>
									<ListItemText>Delete</ListItemText>
								</MenuItem>
							</MenuList>
						</ClickAwayListener>
					</Paper>
				</Grow>
			)}
		</Popper>
	);
};