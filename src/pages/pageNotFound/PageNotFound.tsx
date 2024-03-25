import { FC, useRef } from 'react';
import notFoundIcon from './404.png';
import './PageNotFound.css';

export const PageNotFound: FC = () => {
    const h1Ref = useRef<HTMLHeadingElement>(null);
    return (
        <div className='not-found-page'>
            <h2>ERR: PAGE NOT FOUND</h2>
            <div className='message'>
                <img src={notFoundIcon} alt="404 missing page" />
                <div>
                    <h1> We have bad news for you </h1>
                    <h1 className='text'> We searched high and low but couldn't find what you're looking for. Let's find you a better place for you to go. </h1>
                    <a href="/">Back to homepage</a>
                </div>
            </div>
        </div>
    );
};