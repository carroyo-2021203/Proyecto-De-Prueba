import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { ProductsPage } from './pages/ProductsPage/ProductsPage'
import { Table } from './components/Table/Table'
import { AddProduct } from './pages/AddProduct/AddProduct'
import { UpdateProduct } from './pages/UpdateProduct/UpdateProduct'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    errorElement: <NotFoundPage/>,
    children: [
      {
        path: '/',
        element: <ProductsPage></ProductsPage>,
        children: [
          {
            path: '',
            exact: true,
            element: <Table></Table>
          },
          {
            path: 'add',
            element: <AddProduct></AddProduct>
          },
          {
            path: 'update/:id',
            element: <UpdateProduct/>
          }
        ]
      },
      {
        path: '/products',
        element: <ProductsPage></ProductsPage>,
        children: [
          {
            path: '',
            exact: true,
            element: <Table></Table>
          },
          {
            path: 'add',
            element: <AddProduct></AddProduct>
          },
          {
            path: 'update/:id',
            element: <UpdateProduct/>
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes}></RouterProvider>
  </React.StrictMode>,
)
