import { FC, useContext, useState } from 'react';
import { AuthContext } from '../../Context';
import { LoadingButton } from '@mui/lab';

export const HomePage: FC = () => {

  const {user} = useContext(AuthContext)

    return (
        <div>
          <LoadingButton
                className='login'
                loadingPosition="end"
                variant="contained"
            >
                {user?.name}
            </LoadingButton>
        </div>
    );
};
