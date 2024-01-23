import React, { Suspense } from "react";
import {
    BrowserRouter,
    Route,
    Routes,
  } from "react-router-dom";
import NavBar from "./component/context/NavBar";

const BlogPage = React.lazy(() => import('../src/pages/Blog'));
const BlogListPage = React.lazy(() => import('../src/pages/BlogList'));
const EditBlogPage = React.lazy(() => import('../src/pages/EditBlog'));
const NewBlogPage = React.lazy(() => import('../src/pages/NewBlog'));

const Layout = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<BlogListPage/>} />
          <Route path="/blog/:blogId" element={<BlogPage data ={{
            "id": 198,
            "title": "Or power large building success?",
            "content": "Group point lay voice front hair fund. Loss skill wait technology. Worker whether see seek manage clear.\n\nClearly type north front. Pretty kind ten significant blue president.\n\nFeeling tell fly upon style. Six how song ask. Produce dark especially probably low sea show.\n\nLand challenge claim act. Enough space people visit success mention. Standard begin score company figure yet many.\n\nCatch part produce lay leave. Agreement almost action stop writer.\n\nTask consumer less newspaper. Ok bed meeting south teacher identify.\n\nIssue will father clearly student family senior important. Authority few phone positive increase whose.\n\nPlan add treatment partner serve information open. Itself impact action nation fight try miss. Data item meeting painting wear case likely.\n\nExperience contain land these social offer process light. Society other like within hair throughout since. Floor nearly put.\n\nBag own raise soon card everybody blood.",
            "createdAt": "2015-02-15T00:43:42.965204",
            "imgUrl": "https://picsum.photos/seed/34/300/200"
        }} />} />
          <Route path="/edit-blog/:blogId" element={<EditBlogPage/>} />
          <Route path="/create-blog" element={<NewBlogPage/>} />
        </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
};

export default Layout;
