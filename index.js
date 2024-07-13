import React, { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import * as mqtt from 'mqtt/dist/mqtt.min'

window.React = React

export function config( { project, key, routes } ) {
  fetch( 'https://riser.ddns.net:3000/api/auth', { method: 'POST', body: JSON.stringify( { project, key } ), headers: { 'Content-Type': 'application/json' } } )
  .then( res => res.json( ) )
  .then( res => {
    const { username, password } = res.data

    window.riser = {
      connection: mqtt.connect( `wss://riser.ddns.net:8083`, { username, password } ),
      subscriptions: {},
      reload: {},
      project
    }

    window.riser.connection.on( 'connect', () => console.log( 'riser connected' ) )
    window.riser.connection.on( 'close', () => console.log( 'riser disconnected' ) )

    window.riser.connection.on( 'message', ( topic, message ) => {
      if ( window.riser.subscriptions[ topic ] ) {
        window.riser.subscriptions[ topic ].state( JSON.parse( message.toString( ) ) )
      } else if ( window.riser.reload[ topic ] ) {
        const { table, index, page, sort } = window.riser.subscriptions[ window.riser.reload[ topic ].replace( '-reload', '' ) ]
        window.riser.connection.publish( '/read', JSON.stringify( { project, table, index, page, sort } ) )
      }
    } )

    const router = createBrowserRouter( routes )
    const root = document.getElementById( 'root' )
  
    if ( root ) {
      createRoot( root ).render(
        createElement( RouterProvider, { router } )
      )
    }
  } )
  .catch( error => console.error( 'riser disconnected' ) )
}

export default { config }