import { FC } from 'react';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { Feed } from './pages/feed/Feed';
import { PageNotFound } from './pages/pageNotFound/PageNotFound';
import { Navbar } from './ui';
import { Post } from './pages/post/Post';

export const Router: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navbar />}>
					<Route index element={<Feed />} />
					<Route path="/posts/:postId" element={<Post />} />
					<Route path="*" element={<PageNotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};