import React from 'react'
import { ThemeProvider } from './components/theme-provider'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import '@harnessio/canary/styles'

import { LoginForm } from './pages/Login'
import RootLayout from './RootLayout'
import RepoListPage from './pages/repo-list-page/RepoListPage'
import PipelineListPage from './pages/pipeline-list-page'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "signin",
        element: <LoginForm />,
      },
      {
        path: "repos",
        element: <RepoListPage />
      },
      {
        path: "repos/pipelines",
        element: <PipelineListPage />,
      }
    ]
  }
]);

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
