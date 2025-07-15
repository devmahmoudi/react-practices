import App from '../App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout.jsx'

export const routes = createBrowserRouter([
    {
      path : '/', 
      element : <MainLayout/>,
      errorElement : <h1>چیزی پیدا نشد 😢</h1>,
      children : [
        {
          path : '/', 
          element: <App/>
        }
      ]
    }
  ])