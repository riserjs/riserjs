import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

export { createElement } from 'react'
export { createRoot } from 'react-dom/client'
export { createBrowserRouter, RouterProvider } from 'react-router-dom'

export function routes( routes ) {
  const router = createBrowserRouter( routes )
  const root = document.getElementById( 'root' )

  if ( root ) {
    createRoot( root ).render(
      createElement( RouterProvider, { router } )
    )
  }
}

export default { routes }