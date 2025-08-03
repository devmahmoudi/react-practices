import App from "../App.jsx";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Blogs from "../pages/blog/Blogs.jsx";
import Blog from "../pages/blog/Blog.jsx";
import CreateBlog from "../pages/blog/CreateBlog.jsx";
import EditBlog from "../pages/blog/EditBlog.jsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <h1>چیزی پیدا نشد 😢</h1>,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blogs/create-blog",
        element: <CreateBlog />,
      },
      {
        path: "/blogs/:blogId",
        element: <Blog />,
      },
      {
        path: "/blogs/edit-blog/:blogId",
        element: <EditBlog />,
      },
    ],
  },
]);
