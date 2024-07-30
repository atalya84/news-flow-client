import { FC } from 'react';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Feed } from './pages/feed/Feed';
import { LoginPage, SignUpPage } from './pages/authPage/AuthPage';
import { PageNotFound } from './pages/pageNotFound/PageNotFound';
import { Navbar } from './ui';
import { Post } from './pages/post/Post';
import { Submit } from './pages/submit/Submit';
import { MyPosts } from './pages/myPosts/MyPosts';

export const Router: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navbar />}>
					<Route index element={<Feed />} />
					<Route path="/posts/self" element={<MyPosts />} />
					<Route path="/posts/submit" element={<Submit />} />
					<Route path="/posts/:postId" element={<Post />} />
					<Route path="*" element={<PageNotFound />} />
				</Route>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<SignUpPage />} />
			</Routes>
		</BrowserRouter>
	);
};