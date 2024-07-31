import styled from '@emotion/styled';

export const StyledContainer = styled.div`
	font-family: Helvetica, sans-serif;
	font-size: 13px;
	box-shadow: '0px 3px 6px 0px rgba(50, 50, 50, 0.5)';

	.rw-container-main {
		color: #fff;
		height: 100%;
		width: 100%;
		display: flex;
		border-radius: 0 0 1rem 0;
		border-width: 0 1px 1px 0;
		border-style: solid;
		border-color: #77777777;
	}

	.rw-container-header {
		margin: 0 0 10px 0;
		font-weight: 300;
		font-size: x-large;
		letter-spacing: 2px;
	}

	.rw-container-left {
		padding: 25px;
		width: 60%;
	}

	.rw-container-right {
		background-color: rgba(0, 0, 0, 0.1);
		width: 40%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-top-right-radius: 1rem;
		border-bottom-right-radius: 1rem;
	}
`;
