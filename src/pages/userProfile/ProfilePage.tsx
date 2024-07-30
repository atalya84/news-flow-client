import { FC, useContext, useEffect, useState } from 'react';
import DropFileInput from '../../ui/Auth/ImageInput';
import { AuthContext } from '../../Context';
import { config } from "../../config/config";
import GradientRectangle from '../../ui/Auth/GradientRectangle';
import './ProfilePage.css'
import { Grid } from '@mui/material';
import { Feed } from '../feed/Feed';
import { LoadingButton } from '@mui/lab';
import { signOut } from '../../services/auth.service';
import { logout } from './styles';

export const ProfilePage: FC = () => {
    const { user } = useContext(AuthContext);
    const [imageInfo, setImageInfo] = useState<File | null>(null);
    const [imgUrl, setImgUrl] = useState<string>("");

    useEffect(() => {
        if (user) {
            setImgUrl(`${config.DOMAIN_BASE}/profiles/${user.imgUrl}`);
        }
    }, [user]);

    if (!user) {
        return <div>Loading...</div>;
    }

    const handleSignOut = () => {
        signOut();
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={1}/>
            <Grid item xs={7}>
                <div className="profile-page-container">
                    <GradientRectangle />
                    <DropFileInput onChange={setImageInfo} src={imgUrl} className='profile-input' />
                </div>
                <div className='user-details'>
                    <h1>{user.name}</h1>
                    <h2>{user.email}</h2>
                </div>
                <LoadingButton
                    sx={logout}
                    onClick={handleSignOut}
                    loadingPosition="end"
                    variant="contained"
                >
                    Log Out
                </LoadingButton>
            </Grid>
            <Grid item xs={4}>
                <div className="popular-container">
                    <h1>Your Popular Posts</h1>
                    <Feed/>
                </div>
            </Grid>
        </Grid>
    );
};
