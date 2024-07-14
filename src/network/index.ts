export function useNetwork( ) {
  return {
    signin( { email, password, callback }: any ) {
      fetch( 'https://riser.ddns.net:3000/api/signin', {
        method: 'POST',
        body: JSON.stringify( { email, password, project: ( window as any ).riser.project } ), 
        headers: { 'Content-Type': 'application/json' }
      } )
      .then( res => res.json( ) )
      .then( res => callback( ) )
      .catch( error => console.error( error ) )
    },
    signup( { email, password, callback }: any ) {
      fetch( 'https://riser.ddns.net:3000/api/signup', {
        method: 'POST',
        body: JSON.stringify( { email, password, project: ( window as any ).riser.project } ), 
        headers: { 'Content-Type': 'application/json' }
      } )
      .then( res => res.json( ) )
      .then( res => callback( ) )
      .catch( error => console.error( error ) )
    },
    create( { table, index, value }: any ) {
      ( window as any ).riser.connection.publish( '/create', JSON.stringify( { project: ( window as any ).riser.project, table, index, value } ) )
    },
    read( { table, index, state, page, sort }: any ) {
      window.React.useEffect( ( ) => {
        const path = `/read/${ ( window as any ).riser.project }/${ table }${ index ? `-${ JSON.stringify( index ) }` : '' }`
        ;( window as any ).riser.subscriptions[ path ] = { state, table, index, page, sort }
        ;( window as any ).riser.reload[ `${ path }-reload` ] = path
        ;( window as any ).riser.connection.subscribe( path )
        ;( window as any ).riser.connection.subscribe( `${ path }-reload` )
        ;( window as any ).riser.connection.publish( '/read', JSON.stringify( { project: ( window as any ).riser.project, table, index, page, sort } ) ) 
        return ( ) => {
          ( window as any ).riser.connection.unsubscribe( path )
          ( window as any ).riser.connection.unsubscribe( `${ path }-reload` )
          delete ( window as any ).riser.subscriptions[ path ]
          delete ( window as any ).riser.reload[ `${ path }-reload` ]
        }
      }, [ ] )
    },
    update( { table, index, value, renew }: any ) {
      ( window as any ).riser.connection.publish( '/update', JSON.stringify( { project: ( window as any ).riser.project, table, index, value, renew } ) )
    },
    delete( { table, index, value }: any ) {
      ( window as any ).riser.connection.publish( '/delete', JSON.stringify( { project: ( window as any ).riser.project, table, index, value } ) )
    }
  }
}

export default { useNetwork }