import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import About from './pages/About'
import Learn from './pages/Learn'
import Article from './pages/Article'
import Podcast from './pages/Podcast'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import './styles/global.css'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/learn', element: <Learn /> },
      { path: '/learn/:slug', element: <Article /> },
      { path: '/podcast', element: <Podcast /> },
      { path: '/contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
