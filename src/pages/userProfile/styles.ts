import { SxProps } from '@mui/material';

export const logoutButton: SxProps = {
    borderRadius: '20px',
    backgroundColor: 'transparent',
    color: 'red',
    border: '3px solid red',
    width: '130px',
    height: '45px',
    fontSize: 'larger',
    marginLeft: '150px',
    marginTop: '60px',
    '&:hover': {
        backgroundColor: 'red',
        color: 'whitesmoke',
    },
    '&:disabled': {
        border: '2px solid grey',
        color: 'grey',
    }
};

export const editButton: SxProps = {
    borderRadius: '20px',
    backgroundColor: 'transparent',
    color: '#f9b334',
    border: '3px solid #f9b334',
    width: '130px',
    height: '45px',
    fontSize: 'larger',
    marginLeft: '150px',
    marginTop: '60px',
    '&:hover': {
        backgroundColor: '#f9b334',
        color: 'whitesmoke',
    },
    '&:disabled': {
        border: '2px solid grey',
        color: 'grey',
    }
};
