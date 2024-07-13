import * as mqtt from 'mqtt/dist/mqtt.min'
//import ip6 from 'https://cdn.jsdelivr.net/gh/elgs/ip6/ip6.js';

class Network {
  private conection: any
  private project: string = 'project'
  private subscriptions: any = { }
  private reload: any = { }

  constructor( ) {
    fetch( 'https://riser.ddns.net:3000/api/auth', {
      method: 'POST',
      body: JSON.stringify( { project: process.env.RISER_PROJECT, key: process.env.RISER_KEY } ), 
      headers: { 'Content-Type': 'application/json' }
    } )
    .then( res => res.json( ) )
    .then( res => {
      const { username, password } = res.data
      this.conection = mqtt.connect( `wss://riser.ddns.net:8083`, { username, password } )

      this.conection.on( 'connect', () => console.log( 'riser connected' ) )
      this.conection.on( 'close', () => console.log( 'riser disconnected' ) )

      this.conection.on( 'message', ( topic: string, message: Buffer ) => {
        if ( this.subscriptions[ topic ] ) {
          this.subscriptions[ topic ].state( JSON.parse( message.toString( ) ) )
        } else if ( this.reload[ topic ] ) {
          const { table, index, page, sort } = this.subscriptions[ this.reload[ topic ].replace( '-reload', '' ) ]
          this.conection.publish( '/read', JSON.stringify( { project: this.project, table, index, page, sort } ) )
        }
      } )
    } )
    .catch( error => console.error( 'riser disconnected' ) )
  }

  signin( { email, password, callback }: any ) {
    fetch( 'https://riser.ddns.net:3000/api/signin', {
      method: 'POST',
      body: JSON.stringify( { email, password, project: this.project } ), 
      headers: { 'Content-Type': 'application/json' }
    } )
    .then( res => res.json( ) )
    .then( res => {
      localStorage.setItem( 'username', res.data.username )
      localStorage.setItem( 'password', res.data.password )
      callback( )
    } )
    .catch( error => console.error( error ) )
  }

  signup( { email, password, callback }: any ) {
    fetch( 'https://riser.ddns.net:3000/api/signup', {
      method: 'POST',
      body: JSON.stringify( { email, password, project: this.project } ), 
      headers: { 'Content-Type': 'application/json' }
    } )
    .then( res => res.json( ) )
    .then( res => {
      callback( )
    } )
    .catch( error => console.error( error ) )
  }
}

export function useNetwork( ) {
  return {
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