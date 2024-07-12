import React, { CSSProperties, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Theme } from './theme'
import { Styles } from './types'
export const Touchable = ( props ) => {
	const { dark } = Theme()
	const [ background, setBg ] = useState( 'transparent' ) 

	const styles: Styles = {
		container: {
			background,
			height: 40,
			width: 40,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: 40,
			transition: 'all .5s ease',
		},
		icon: {
			fontSize: props.size,
			padding: props.padding,
			
		}
	}

	const click = ( ) => {
		setBg( dark )
		setTimeout( ( ) => {
			setBg( 'transparent' )
			props.onClick()
		}, 100 )
	}

	return (
		<div onClick={ click } style={ { ...styles.container, ...props.style } }>
			<FontAwesomeIcon icon={ props.icon } color={ props.color } style={ styles.icon } />
		</div>
	)
}
