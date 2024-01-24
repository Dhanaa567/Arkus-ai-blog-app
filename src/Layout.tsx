import React, { Suspense } from "react";
import {
    BrowserRouter,
    Route,
    Routes,
  } from "react-router-dom";
import NavBar from "./component/context/NavBar";

const BlogPage = React.lazy(() => import('./pages/Blog'));
const BlogListPage = React.lazy(() => import('./pages/BlogList'));
const EditBlogPage = React.lazy(() => import('./pages/EditBlog'));
const NewBlogPage = React.lazy(() => import('./pages/NewBlog'));

const Layout = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<BlogListPage/>} />
          <Route path="/blog/:blogId" element={<BlogPage/>} />
          <Route path="/edit-blog/:blogId" element={<EditBlogPage/>} />
          <Route path="/create-blog" element={<NewBlogPage/>} />
        </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
};

export default Layout;
