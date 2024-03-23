import { FC, useRef } from 'react';
import homeIcon from './404.png';
import { Container } from './styles';
import './PageNotFound.css';

export const PageNotFound: FC = () => {
    const h1Ref = useRef<HTMLHeadingElement>(null);
    return (
        <Container data-testid="notfound-container">
            <div className='not-found-page'>
                <header className='main-title'>
                    <h2>PAGE NOT FOUND</h2>
                </header>
                <section>
                    <div>
                        <img src={homeIcon} alt="404 missing page" />
                    </div>
                    <div className='content'>
                        <h1> We have bad news for you </h1>
                        <h1 className='text'> We searched high and low but couldn't find what you're looking for. Let's find you a better place for you to go. </h1>
                        <h1 ref={h1Ref} title="Go to home page" onClick={() => {}}>
                            <a href="/">Back to homepage</a>
                        </h1>
                    </div>
                </section>
            </div>
        </Container>
    );
};