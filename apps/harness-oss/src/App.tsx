import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { SandboxRepoListPage } from '@harnessio/ui/views'

import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <SandboxRepoListPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
