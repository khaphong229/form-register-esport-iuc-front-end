import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './page/Home'
import Register from './page/Register'
import './assets/scss/reset.scss'
import './assets/scss/base.scss'
import Competition from './page/Competition'
import ListTeamCompetition from './page/ListTeamCompetition'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'register',
    element: <Register />
  },
  {
    path: 'competition',
    element: <Competition />
  },
  {
    path: 'list-teams',
    element: <ListTeamCompetition />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
