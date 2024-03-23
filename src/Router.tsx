import { FC } from 'react';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { HomePage } from './pages/homePage/HomePage';
import { PageNotFound } from './pages/pageNotFound/PageNotFound';
import { Navbar } from './ui';

export const Router: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navbar />}>
                    <Route index element={<HomePage />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
