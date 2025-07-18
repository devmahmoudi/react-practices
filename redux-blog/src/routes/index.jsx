import App from '../App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout.jsx'
import Blogs from '../pages/Blogs.jsx'
import Blog from '../pages/Blog.jsx'

export const routes = createBrowserRouter([
    {
      path : '/', 
      element : <MainLayout/>,
      errorElement : <h1>چیزی پیدا نشد 😢</h1>,
      children : [
        {
          path : '/', 
          element: <App/>
        },
        {
          path: '/blogs',
          element: <Blogs/>
        },
        {
          path: '/blogs/:blogId',
          element: <Blog/>
        }
      ]
    }
  ])